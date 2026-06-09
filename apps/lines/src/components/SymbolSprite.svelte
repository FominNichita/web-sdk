<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Sprite, Container } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { onMount } from 'svelte';
	import type { SymbolState } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const isWinning = $derived(props.state === 'win');
	const scale = new Tween(1);
	let animationRunId = 0;

	onMount(() => {
		if (!isWinning) props.oncomplete?.();
	});

	$effect(() => {
		props.symbolInfo;
		props.state;
		animationRunId += 1;
		const runId = animationRunId;

		if (!isWinning) {
			scale.set(1, { duration: 0 });
			props.oncomplete?.();
			return;
		}

		void (async () => {
			await scale.set(1, { duration: 0 });
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

	<Sprite
		anchor={0.5}
		key={props.symbolInfo.assetKey}
		{width}
		{height}
		tint={isWinning ? 0xfff6d2 : 0xffffff}
	/>
</Container>
