<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const { stateXstateDerived, eventEmitter } = getContext();
	const sizes = { width: 150, height: 72 };
	const disabled = $derived(!stateXstateDerived.isIdle());
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');
	const label = $derived(active ? i18nDerived.disable() : i18nDerived.buyBonus());
	const textStyle = {
		fontFamily: 'Sancreek',
		fill: '#E4C5AA',
		stroke: { color: '#000000', width: 3 },
	};

	const openModal = () => (stateModal.modal = { name: 'buyBonus' });
	const disableActiveBetMode = () => (stateBet.activeBetModeKey = 'BASE');
	const onpress = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });

		if (active) {
			disableActiveBetMode();
		} else {
			openModal();
		}
	};
</script>

<UiButton
	{...props}
	{sizes}
	{disabled}
	{active}
	{onpress}
	icon="menu"
	{label}
	assetKey="uiButtonBuyBonusBg"
	{textStyle}
/>
