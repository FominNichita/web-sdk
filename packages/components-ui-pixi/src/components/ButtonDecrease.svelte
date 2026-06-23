<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: 65, height: 65 };
	const TEXT_OFFSET_X = 0;
	const TEXT_OFFSET_Y = -2;
	const textStyle = { fontFamily: 'Sancreek', fontSize: 50, fill: '#E4C5AA' };
	const smallest = $derived(stateConfig.betAmountOptions[0]);
	const disabled = $derived(
		!context.stateXstateDerived.isIdle() || stateBet.betAmount === smallest,
	);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

		const nextSmaller = [...stateConfig.betAmountOptions]
			.sort((a, b) => b - a)
			.find((option) => option < stateBet.betAmount);

		stateBetDerived.setBetAmount(nextSmaller || smallest);
	};
</script>

<UiButton
	{...props}
	{sizes}
	{onpress}
	{disabled}
	icon="decrease"
	assetKey="uiButtonMinus"
	textOffsetX={TEXT_OFFSET_X}
	textOffsetY={TEXT_OFFSET_Y}
	{textStyle}
/>
