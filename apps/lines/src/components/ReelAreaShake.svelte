<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { getContext } from '../game/context';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
	const context = getContext();
	const offsetX = new Tween(0);
	const offsetY = new Tween(0);
	const anticipationScale = new Tween(1);
	let shakeRunId = 0;
	const hasAnticipation = $derived(
		context.stateGame.board.some(
			(reel) => reel.reelState.anticipating && reel.reelState.motion !== 'stopped',
		),
	);
	const canvasCenter = $derived({
		x: context.stateLayoutDerived.canvasSizes().width * 0.5,
		y: context.stateLayoutDerived.canvasSizes().height * 0.5,
	});

	$effect(() => {
		void anticipationScale.set(hasAnticipation ? 1.015 : 1, {
			duration: hasAnticipation ? 420 : 220,
		});
	});

	const positions = [
		{ x: -7, y: 4 },
		{ x: 6, y: -4 },
		{ x: -5, y: -2 },
		{ x: 4, y: 3 },
		{ x: -2, y: 1 },
		{ x: 0, y: 0 },
	] as const;
	const settlePositions = [
		{ x: -2, y: 1 },
		{ x: 2, y: -1 },
		{ x: -1, y: 0.5 },
		{ x: 0, y: 0 },
	] as const;

	const runShake = (shakePositions: readonly { x: number; y: number }[], duration: number) => {
		shakeRunId += 1;
		const runId = shakeRunId;

		void (async () => {
			await Promise.all([
				offsetX.set(0, { duration: 0 }),
				offsetY.set(0, { duration: 0 }),
			]);

			for (const position of shakePositions) {
				if (runId !== shakeRunId) return;
				await Promise.all([
					offsetX.set(position.x, { duration }),
					offsetY.set(position.y, { duration }),
				]);
			}
		})();
	};

	context.eventEmitter.subscribeOnMount({
		screenShake: ({ intensity = 1 }) => {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			runShake(
				positions.map(({ x, y }) => ({ x: x * intensity, y: y * intensity })),
				42,
			);
		},
		reelLandImpact: () => {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			if (stateBet.isTurbo || hasAnticipation) return;
			runShake(settlePositions, 24);
		},
	});
</script>

<Container
	x={canvasCenter.x + offsetX.current}
	y={canvasCenter.y + offsetY.current}
	pivot={canvasCenter}
	scale={anticipationScale.current}
>
	{@render props.children()}
</Container>
