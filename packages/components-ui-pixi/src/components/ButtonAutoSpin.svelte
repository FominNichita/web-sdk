<script lang="ts">
	import { Container } from 'pixi-svelte';
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateModal } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import ButtonBetAutoSpinsCounter from './ButtonBetAutoSpinsCounter.svelte';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: 146, height: 60 };
	const textStyle = { fontFamily: 'Sancreek', fill: '#111111' };
	const active = $derived(stateBetDerived.hasAutoBetCounter());
	const assetKey = $derived(active ? 'uiWinBg' : 'uiButtonFooterBg');
	const disabled = $derived.by(() => {
		if (stateBet.isSpaceHold) return true;
		if (!context.stateXstateDerived.isIdle() && !stateBetDerived.hasAutoBetCounter()) return true;
		if (!stateBetDerived.isBetCostAvailable()) return true;
		return false;
	});

	const stopAutoSpin = () => (stateBet.autoSpinsCounter = 0);
	const openModal = () => (stateModal.modal = { name: 'autoSpin' });
	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.hasAutoBetCounter() ? stopAutoSpin() : openModal();
	};
</script>

<UiButton
	{...props}
	{sizes}
	{active}
	{onpress}
	{disabled}
	dimDisabled={false}
	hideText={active}
	icon="autoSpin"
	{assetKey}
	{textStyle}
>
	<Container x={sizes.width * 0.5} y={sizes.height * 0.5}>
		<ButtonBetAutoSpinsCounter />
	</Container>
</UiButton>
