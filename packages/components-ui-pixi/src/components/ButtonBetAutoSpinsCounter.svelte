<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { UI_BASE_SIZE } from '../constants';

	const INFINITY_OFFSET_X = 0;
	const INFINITY_OFFSET_Y = -6;
	const isInfinity = $derived(stateBet.autoSpinsCounter === Infinity);
	const fontSizeMultiplier = $derived.by(() => {
		if (isInfinity) return 1.8;
		if (stateBet.autoSpinsCounter > 99) return 1.45;
		if (stateBet.autoSpinsCounter > 9) return 1.8;
		return 2.05;
	});
</script>

{#if stateBet.autoSpinsCounter > 0}
	<Text
		anchor={0.5}
		x={isInfinity ? INFINITY_OFFSET_X : 0}
		y={isInfinity ? INFINITY_OFFSET_Y : 0}
		text={isInfinity ? '∞' : stateBet.autoSpinsCounter}
		style={{
			fontFamily: 'Sancreek',
			fill: '#111111',
			fontWeight: 'bold',
			fontSize: fontSizeMultiplier * UI_BASE_SIZE * 0.2,
		}}
	/>
{/if}
