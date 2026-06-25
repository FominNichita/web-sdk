<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Sprite, Container, Graphics } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { onMount } from 'svelte';
	import type { RawSymbol, SymbolState } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		rawSymbol: RawSymbol;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		oncomplete?: () => void;
	};

	const LANDING_MOTION = {
		impact: {
			scaleX: 1.025,
			scaleY: 0.91,
			offsetY: 5,
			duration: 85,
		},
		rebound: {
			scaleX: 0.99,
			scaleY: 1.025,
			offsetY: -1.5,
			duration: 90,
		},
		settle: {
			scaleX: 1,
			scaleY: 1,
			offsetY: 0,
			duration: 130,
		},
	} as const;

	const props: Props = $props();
	const isWinning = $derived(props.state === 'win');
	const isLanding = $derived(props.state === 'land');
	const isWildLanding = $derived(
		isLanding &&
			props.rawSymbol.name === 'W' &&
			Boolean(props.rawSymbol.multiplier),
	);
	const scaleX = new Tween(1);
	const scaleY = new Tween(1);
	const offsetY = new Tween(0);
	const revealProgress = new Tween(0);
	const scatterShockProgress = new Tween(0);
	let animationRunId = 0;

	onMount(() => {
		if (!isWinning && !isLanding) props.oncomplete?.();
	});

	$effect(() => {
		props.symbolInfo;
		props.state;
		animationRunId += 1;
		const runId = animationRunId;

		if (!isWinning && !isLanding) {
			scaleX.set(1, { duration: 0 });
			scaleY.set(1, { duration: 0 });
			offsetY.set(0, { duration: 0 });
			revealProgress.set(0, { duration: 0 });
			scatterShockProgress.set(0, { duration: 0 });
			props.oncomplete?.();
			return;
		}

		void (async () => {
			await Promise.all([
				scaleX.set(1, { duration: 0 }),
				scaleY.set(1, { duration: 0 }),
				offsetY.set(0, { duration: 0 }),
			]);
			await revealProgress.set(0, { duration: 0 });
			await scatterShockProgress.set(0, { duration: 0 });

			if (isLanding) {
				if (props.rawSymbol.name === 'S') {
					void scatterShockProgress.set(1, { duration: 300 });
				}
				await Promise.all([
					scaleX.set(LANDING_MOTION.impact.scaleX, {
						duration: LANDING_MOTION.impact.duration,
					}),
					scaleY.set(LANDING_MOTION.impact.scaleY, {
						duration: LANDING_MOTION.impact.duration,
					}),
					offsetY.set(LANDING_MOTION.impact.offsetY, {
						duration: LANDING_MOTION.impact.duration,
					}),
				]);
				await Promise.all([
					scaleX.set(LANDING_MOTION.rebound.scaleX, {
						duration: LANDING_MOTION.rebound.duration,
					}),
					scaleY.set(LANDING_MOTION.rebound.scaleY, {
						duration: LANDING_MOTION.rebound.duration,
					}),
					offsetY.set(LANDING_MOTION.rebound.offsetY, {
						duration: LANDING_MOTION.rebound.duration,
					}),
				]);
				await Promise.all([
					scaleX.set(LANDING_MOTION.settle.scaleX, {
						duration: LANDING_MOTION.settle.duration,
					}),
					scaleY.set(LANDING_MOTION.settle.scaleY, {
						duration: LANDING_MOTION.settle.duration,
					}),
					offsetY.set(LANDING_MOTION.settle.offsetY, {
						duration: LANDING_MOTION.settle.duration,
					}),
				]);
			}

			if (isWildLanding) {
				await Promise.all([
					scaleX.set(1.12, { duration: 170 }),
					scaleY.set(1.12, { duration: 170 }),
					revealProgress.set(1, { duration: 260 }),
				]);
				await Promise.all([
					scaleX.set(1, { duration: 180 }),
					scaleY.set(1, { duration: 180 }),
				]);

				if (runId === animationRunId) props.oncomplete?.();
				return;
			}

			if (isLanding) {
				if (runId === animationRunId) props.oncomplete?.();
				return;
			}

			await Promise.all([
				scaleX.set(1.08, { duration: 160 }),
				scaleY.set(1.08, { duration: 160 }),
			]);
			await Promise.all([
				scaleX.set(1.02, { duration: 220 }),
				scaleY.set(1.02, { duration: 220 }),
			]);
			await Promise.all([
				scaleX.set(1.1, { duration: 160 }),
				scaleY.set(1.1, { duration: 160 }),
			]);
			await Promise.all([
				scaleX.set(1, { duration: 220 }),
				scaleY.set(1, { duration: 220 }),
			]);

			if (runId === animationRunId) props.oncomplete?.();
		})();
	});

	const width = $derived(SYMBOL_SIZE * props.symbolInfo.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.symbolInfo.sizeRatios.height);
</script>

<Container
	x={props.x}
	y={(props.y ?? 0) + offsetY.current}
	scale={{ x: scaleX.current, y: scaleY.current }}
>
	{#if isWinning}
		<Graphics
			draw={(graphics) => {
				graphics.circle(0, 0, SYMBOL_SIZE * 0.49);
				graphics.fill({ color: 0xff9f1c, alpha: 0.08 });
				graphics.circle(0, 0, SYMBOL_SIZE * 0.37);
				graphics.fill({ color: 0xffd86a, alpha: 0.12 });
				graphics.circle(0, 0, SYMBOL_SIZE * 0.24);
				graphics.fill({ color: 0xfff1a6, alpha: 0.15 });
			}}
		/>
	{/if}

	{#if isWinning}
		<Sprite
			anchor={0.5}
			key={props.symbolInfo.assetKey}
			width={width * 1.18}
			height={height * 1.18}
			alpha={0.42}
			tint={0xfff1a6}
		/>
	{/if}

	{#if isWildLanding}
		<Sprite
			anchor={0.5}
			key={props.symbolInfo.assetKey}
			width={width * (1.08 + revealProgress.current * 0.2)}
			height={height * (1.08 + revealProgress.current * 0.2)}
			alpha={(1 - revealProgress.current) * 0.62}
			tint={0xffd45c}
		/>
		<Graphics
			rotation={revealProgress.current * 0.9}
			draw={(graphics) => {
				const alpha = Math.sin(revealProgress.current * Math.PI);
				graphics.circle(0, 0, SYMBOL_SIZE * (0.32 + revealProgress.current * 0.28));
				graphics.stroke({ width: 5, color: 0xffd45c, alpha: alpha * 0.72 });

				for (let ray = 0; ray < 8; ray += 1) {
					const angle = (Math.PI * 2 * ray) / 8;
					const inner = SYMBOL_SIZE * 0.38;
					const outer = inner + SYMBOL_SIZE * 0.18 * alpha;
					graphics.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
					graphics.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
				}
				graphics.stroke({ width: 3, color: 0xfff1a6, alpha: alpha * 0.8 });
			}}
		/>
	{/if}

	{#if isLanding && props.rawSymbol.name === 'S'}
		<Graphics
			draw={(graphics) => {
				const alpha = 1 - scatterShockProgress.current;
				const radius = SYMBOL_SIZE * (0.24 + scatterShockProgress.current * 0.34);
				graphics.circle(0, 0, radius);
				graphics.stroke({ width: 7, color: 0xff9f1c, alpha: alpha * 0.22 });
				graphics.circle(0, 0, radius * 0.88);
				graphics.stroke({ width: 2.5, color: 0xfff0a3, alpha: alpha * 0.85 });
			}}
		/>
	{/if}

	<Sprite
		anchor={0.5}
		key={props.symbolInfo.assetKey}
		{width}
		{height}
		tint={isWinning ? 0xfff6d2 : 0xffffff}
	/>
</Container>
