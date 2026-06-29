<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const desktop = $derived(['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()));
	const sizes = $derived(
		desktop
			? { width: desktopHudLayout.betArrowDown.width, height: desktopHudLayout.betArrowDown.height }
			: { width: 65, height: 65 },
	);
	const TEXT_OFFSET_X = $derived(0);
	const TEXT_OFFSET_Y = $derived(desktop ? desktopHudLayout.betArrowDown.textOffsetY : -2);
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
	hideText={desktop}
	assetKey={desktop ? 'uiRemadeArrowDown' : 'uiButtonMinus'}
	textOffsetX={TEXT_OFFSET_X}
	textOffsetY={TEXT_OFFSET_Y}
	{textStyle}
/>
