<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { getContext } from '../context';
	import { compactPortraitLayout } from '../compactPortraitLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const compactPortrait = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' &&
			context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: 136, height: 60 };
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		...(compactPortrait ? { fontSize: compactPortraitLayout.text.betActionSize } : {}),
		fill: '#111111',
	});
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<UiButton
			{...props}
			{sizes}
			{onpress}
			{disabled}
			dimDisabled={false}
			icon="autoSpin"
			label={['spin_default', 'spin_disabled'].includes(key)
				? i18nDerived.bet()
				: i18nDerived.stop()}
			assetKey="uiButtonFooterBg"
			pressedAssetKey="uiWinBg"
			textMaxWidth={compactPortrait
				? sizes.width * (1 - compactPortraitLayout.textPadding.buttonHorizontalRatio * 2)
				: undefined}
			textMaxHeight={compactPortrait
				? sizes.height * (1 - compactPortraitLayout.textPadding.buttonVerticalRatio * 2)
				: undefined}
			minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
			{textStyle}
		/>
	{/snippet}
</ButtonBetProvider>
