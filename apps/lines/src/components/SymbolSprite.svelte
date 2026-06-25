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

	const props: Props = $props();
	const isWinning = $derived(props.state === 'win');
	const isWildLanding = $derived(
		props.state === 'land' &&
			props.rawSymbol.name === 'W' &&
			Boolean(props.rawSymbol.multiplier),
	);
	const scale = new Tween(1);
	const revealProgress = new Tween(0);
	let animationRunId = 0;

	onMount(() => {
		if (!isWinning && !isWildLanding) props.oncomplete?.();
	});

	$effect(() => {
		props.symbolInfo;
		props.state;
		animationRunId += 1;
		const runId = animationRunId;

		if (!isWinning && !isWildLanding) {
			scale.set(1, { duration: 0 });
			revealProgress.set(0, { duration: 0 });
			props.oncomplete?.();
			return;
		}

		void (async () => {
			await scale.set(1, { duration: 0 });
			await revealProgress.set(0, { duration: 0 });

			if (isWildLanding) {
				await Promise.all([
					scale.set(1.12, { duration: 170 }),
					revealProgress.set(1, { duration: 260 }),
				]);
				await scale.set(1, { duration: 180 });

				if (runId === animationRunId) props.oncomplete?.();
				return;
			}

			await scale.set(1.08, { duration: 160 });
			await scale.set(1.02, { duration: 220 });
			await scale.set(1.1, { duration: 160 });
			await scale.set(1, { duration: 220 });

			if (runId === animationRunId) props.oncomplete?.();
		})();
	});

	const width = $derived(SYMBOL_SIZE * props.symbolInfo.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.symbolInfo.sizeRatios.height);
</script>

<Container x={props.x} y={props.y} scale={scale.current}>
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

	<Sprite
		anchor={0.5}
		key={props.symbolInfo.assetKey}
		{width}
		{height}
		tint={isWinning ? 0xfff6d2 : 0xffffff}
	/>
</Container>
