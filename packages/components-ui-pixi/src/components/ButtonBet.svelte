<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: 150, height: 72 };
	const textStyle = { fontFamily: 'Sancreek', fill: '#E4C5AA' };
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<UiButton
			{...props}
			{sizes}
			{onpress}
			{disabled}
			icon="autoSpin"
			label={['spin_default', 'spin_disabled'].includes(key)
				? i18nDerived.bet()
				: i18nDerived.stop()}
			assetKey="uiButtonFooterBg"
			{textStyle}
		/>
	{/snippet}
</ButtonBetProvider>
