<script lang="ts">
	import { Graphics } from 'pixi-svelte';
	import type { Graphics as PixiGraphics } from 'pixi.js';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	import type { Position } from '../game/types';
	import { getSymbolX, getSymbolY } from '../game/utils';

	type Props = {
		positions: Position[];
	};

	const props: Props = $props();
	const traceProgress = new Tween(0);
	const points = $derived(
		[...props.positions]
			.sort((left, right) => left.reel - right.reel)
			.map(({ reel, row }) => ({
				x: getSymbolX(reel),
				y: getSymbolY(row - 1),
			})),
	);
	const positionSignature = $derived(
		props.positions.map(({ reel, row }) => `${reel}:${row}`).join('|'),
	);
	const segments = $derived(
		points.slice(1).map((point, index) => {
			const start = points[index];
			const length = Math.hypot(point.x - start.x, point.y - start.y);
			return { start, end: point, length };
		}),
	);
	const totalLength = $derived(segments.reduce((total, segment) => total + segment.length, 0));

	$effect(() => {
		positionSignature;

		if (props.positions.length < 2) {
			void traceProgress.set(0, { duration: 0 });
			return;
		}

		void (async () => {
			await traceProgress.set(0, { duration: 0 });
			await traceProgress.set(1, { duration: 420, easing: cubicOut });
		})();
	});

	const drawPath = (
		graphics: PixiGraphics,
		width: number,
		color: number,
		alpha: number,
	) => {
		if (points.length < 2) return;

		graphics.moveTo(points[0].x, points[0].y);
		let remainingLength = totalLength * traceProgress.current;

		for (const segment of segments) {
			if (remainingLength <= 0) break;

			const segmentProgress = Math.min(remainingLength / segment.length, 1);
			graphics.lineTo(
				segment.start.x + (segment.end.x - segment.start.x) * segmentProgress,
				segment.start.y + (segment.end.y - segment.start.y) * segmentProgress,
			);
			remainingLength -= segment.length;
		}

		graphics.stroke({ width, color, alpha, cap: 'round', join: 'round' });
	};

	const visiblePointCount = $derived.by(() => {
		if (points.length === 0) return 0;

		const tracedLength = totalLength * traceProgress.current;
		let accumulatedLength = 0;
		let count = 1;

		for (const segment of segments) {
			accumulatedLength += segment.length;
			if (tracedLength + 0.5 < accumulatedLength) break;
			count += 1;
		}

		return count;
	});
</script>

{#if points.length >= 2}
	<Graphics
		alpha={0.72}
		draw={(graphics) => {
			drawPath(graphics, 18, 0x5a2600, 0.45);
			drawPath(graphics, 10, 0xff9f1c, 0.68);
			drawPath(graphics, 3, 0xfff0a3, 1);

			for (const point of points.slice(0, visiblePointCount)) {
				graphics.circle(point.x, point.y, 10);
				graphics.fill({ color: 0xffd45c, alpha: 0.78 });
				graphics.circle(point.x, point.y, 4);
				graphics.fill({ color: 0xffffff, alpha: 0.95 });
			}
		}}
	/>
{/if}
