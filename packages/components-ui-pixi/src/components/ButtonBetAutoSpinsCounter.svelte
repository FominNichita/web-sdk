<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { UI_BASE_SIZE } from '../constants';

	const fontSizeMultiplier = $derived.by(() => {
		if (stateBet.autoSpinsCounter === Infinity) return 1.8;
		if (stateBet.autoSpinsCounter > 99) return 1.45;
		if (stateBet.autoSpinsCounter > 9) return 1.8;
		return 2.05;
	});
	const counterTextOffsetY = $derived(
		stateBet.autoSpinsCounter === Infinity ? UI_BASE_SIZE * 0.05 : UI_BASE_SIZE * 0.02,
	);
</script>

{#if stateBet.autoSpinsCounter > 0}
	<Text
		anchor={0.5}
		y={counterTextOffsetY}
		text={stateBet.autoSpinsCounter === Infinity ? '∞' : stateBet.autoSpinsCounter}
		style={{
			fontFamily: 'Sancreek',
			fill: '#111111',
			fontWeight: 'bold',
			fontSize: fontSizeMultiplier * UI_BASE_SIZE * 0.2,
		}}
	/>
{/if}
