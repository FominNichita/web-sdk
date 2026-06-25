<script lang="ts">
	import { Graphics } from 'pixi-svelte';
	import type { Graphics as PixiGraphics } from 'pixi.js';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	import type { Position } from '../game/types';
	import { getSymbolX, getSymbolY } from '../game/utils';

	type Props = {
		positions: Position[];
		lineIndex?: number;
	};

	const props: Props = $props();
	const LINE_PALETTE = [
		{ shadow: 0x5a2600, body: 0xff9f1c, core: 0xfff0a3 },
		{ shadow: 0x542000, body: 0xffb52d, core: 0xffe38a },
		{ shadow: 0x4b2600, body: 0xe99622, core: 0xffd76a },
		{ shadow: 0x632b00, body: 0xffc04a, core: 0xfff3bd },
	] as const;
	const lineColors = $derived(
		LINE_PALETTE[Math.abs((props.lineIndex ?? 1) - 1) % LINE_PALETTE.length],
	);
	const traceStartProgress = new Tween(0);
	const traceEndProgress = new Tween(0);
	let traceRunId = 0;
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
	const pointDistances = $derived([
		0,
		...segments.map((_, index) =>
			segments.slice(0, index + 1).reduce((total, segment) => total + segment.length, 0),
		),
	]);

	$effect(() => {
		positionSignature;
		traceRunId += 1;
		const runId = traceRunId;

		if (props.positions.length < 2) {
			void traceStartProgress.set(0, { duration: 0 });
			void traceEndProgress.set(0, { duration: 0 });
			return;
		}

		void (async () => {
			await Promise.all([
				traceStartProgress.set(0, { duration: 0 }),
				traceEndProgress.set(0, { duration: 0 }),
			]);
			await traceEndProgress.set(1, { duration: 420, easing: cubicOut });
			if (runId !== traceRunId) return;
			await new Promise((resolve) => setTimeout(resolve, 90));
			if (runId !== traceRunId) return;
			await traceStartProgress.set(1, { duration: 250, easing: cubicOut });
		})();
	});

	const drawPath = (
		graphics: PixiGraphics,
		width: number,
		color: number,
		alpha: number,
	) => {
		if (points.length < 2) return;

		const visibleStart = totalLength * traceStartProgress.current;
		const visibleEnd = totalLength * traceEndProgress.current;
		let traversedLength = 0;
		let pathStarted = false;

		for (const segment of segments) {
			const segmentStart = traversedLength;
			const segmentEnd = segmentStart + segment.length;
			traversedLength = segmentEnd;

			const overlapStart = Math.max(visibleStart, segmentStart);
			const overlapEnd = Math.min(visibleEnd, segmentEnd);
			if (overlapStart >= overlapEnd) continue;

			const startProgress = (overlapStart - segmentStart) / segment.length;
			const endProgress = (overlapEnd - segmentStart) / segment.length;
			const startPoint = {
				x: segment.start.x + (segment.end.x - segment.start.x) * startProgress,
				y: segment.start.y + (segment.end.y - segment.start.y) * startProgress,
			};
			const endPoint = {
				x: segment.start.x + (segment.end.x - segment.start.x) * endProgress,
				y: segment.start.y + (segment.end.y - segment.start.y) * endProgress,
			};

			if (!pathStarted) {
				graphics.moveTo(startPoint.x, startPoint.y);
				pathStarted = true;
			}
			graphics.lineTo(endPoint.x, endPoint.y);
		}

		if (pathStarted) graphics.stroke({ width, color, alpha, cap: 'round', join: 'round' });
	};

	const visiblePoints = $derived.by(() => {
		if (traceStartProgress.current >= 1) return [];

		const visibleStart = totalLength * traceStartProgress.current;
		const visibleEnd = totalLength * traceEndProgress.current;
		return points.filter(
			(_, index) =>
				pointDistances[index] + 0.5 >= visibleStart &&
				pointDistances[index] <= visibleEnd + 0.5,
		);
	});

	const pointAtDistance = (distance: number) => {
		if (points.length === 0) return undefined;
		if (distance <= 0) return points[0];

		let traversedLength = 0;
		for (const segment of segments) {
			const segmentEnd = traversedLength + segment.length;
			if (distance <= segmentEnd) {
				const progress = (distance - traversedLength) / segment.length;
				return {
					x: segment.start.x + (segment.end.x - segment.start.x) * progress,
					y: segment.start.y + (segment.end.y - segment.start.y) * progress,
				};
			}
			traversedLength = segmentEnd;
		}

		return points[points.length - 1];
	};

	const travelingSpark = $derived.by(() => {
		if (traceEndProgress.current <= 0 || traceStartProgress.current >= 1) return undefined;

		const progress =
			traceEndProgress.current < 1 ? traceEndProgress.current : traceStartProgress.current;
		return pointAtDistance(totalLength * progress);
	});
</script>

{#if points.length >= 2}
	<Graphics
		alpha={0.72}
		draw={(graphics) => {
			drawPath(graphics, 18, lineColors.shadow, 0.45);
			drawPath(graphics, 10, lineColors.body, 0.68);
			drawPath(graphics, 3, lineColors.core, 1);

			for (const point of visiblePoints) {
				graphics.circle(point.x, point.y, 10);
				graphics.fill({ color: lineColors.body, alpha: 0.78 });
				graphics.circle(point.x, point.y, 4);
				graphics.fill({ color: 0xffffff, alpha: 0.95 });
			}

			if (travelingSpark) {
				graphics.circle(travelingSpark.x, travelingSpark.y, 18);
				graphics.fill({ color: lineColors.body, alpha: 0.18 });
				graphics.circle(travelingSpark.x, travelingSpark.y, 10);
				graphics.fill({ color: lineColors.body, alpha: 0.48 });
				graphics.circle(travelingSpark.x, travelingSpark.y, 4);
				graphics.fill({ color: 0xffffff, alpha: 1 });
			}
		}}
	/>
{/if}
