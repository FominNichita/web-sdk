<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	const INFINITY_OFFSET_X = 0;
	const INFINITY_OFFSET_Y = -6;
	const COUNTER_FONT_SIZE = {
		singleDigit: 44,
		doubleDigit: 40,
		multipleDigits: 34,
		infinity: 42,
	} as const;
	const isInfinity = $derived(stateBet.autoSpinsCounter === Infinity);
	const fontSize = $derived.by(() => {
		if (isInfinity) return COUNTER_FONT_SIZE.infinity;
		if (stateBet.autoSpinsCounter > 99) return COUNTER_FONT_SIZE.multipleDigits;
		if (stateBet.autoSpinsCounter > 9) return COUNTER_FONT_SIZE.doubleDigit;
		return COUNTER_FONT_SIZE.singleDigit;
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
			fontSize,
		}}
	/>
{/if}
