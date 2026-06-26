<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const desktop = $derived(context.stateLayoutDerived.layoutType() === 'desktop');
	const sizes = $derived(
		desktop
			? { width: desktopHudLayout.betArrowUp.width, height: desktopHudLayout.betArrowUp.height }
			: { width: 65, height: 65 },
	);
	const TEXT_OFFSET_X = $derived(0);
	const TEXT_OFFSET_Y = $derived(desktop ? desktopHudLayout.betArrowUp.textOffsetY : -2);
	const textStyle = { fontFamily: 'Sancreek', fontSize: 50, fill: '#E4C5AA' };
	const biggest = $derived(stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1]);
	const disabled = $derived(!context.stateXstateDerived.isIdle() || stateBet.betAmount === biggest);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

		const nextBigger = [...stateConfig.betAmountOptions]
			.sort((a, b) => a - b)
			.find((option) => option > stateBet.betAmount);

		stateBetDerived.setBetAmount(nextBigger || biggest);
	};
</script>

<UiButton
	{...props}
	{sizes}
	{onpress}
	{disabled}
	icon="increase"
	assetKey={desktop ? 'uiRemadeArrowUp' : 'uiButtonPlus'}
	textOffsetX={TEXT_OFFSET_X}
	textOffsetY={TEXT_OFFSET_Y}
	{textStyle}
/>
