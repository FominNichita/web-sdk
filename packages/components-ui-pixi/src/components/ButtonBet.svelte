<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { getContext } from '../context';
	import { compactPortraitLayout } from '../compactPortraitLayout';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const compactPortrait = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' &&
			context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const desktop = $derived(context.stateLayoutDerived.layoutType() === 'desktop');
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = $derived(
		desktop
			? { width: desktopHudLayout.spinButton.width, height: desktopHudLayout.spinButton.height }
			: { width: 136, height: 60 },
	);
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		...(desktop ? { fontSize: desktopHudLayout.spinButton.fontSize } : {}),
		...(compactPortrait ? { fontSize: compactPortraitLayout.betActionText.fontSize } : {}),
		fill: desktop ? '#F4D276' : '#111111',
		...(desktop ? { stroke: { color: '#1B0E05', width: 4 } } : {}),
	});
	const assetKey = $derived(desktop ? 'uiRemadeSpinButtonBg' : 'uiButtonFooterBg');
	const pressedAssetKey = $derived(desktop ? 'uiRemadeSpinButtonBg' : 'uiWinBg');
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
			hideText={desktop}
			label={['spin_default', 'spin_disabled'].includes(key)
				? i18nDerived.bet()
				: i18nDerived.stop()}
			{assetKey}
			{pressedAssetKey}
			textMaxWidth={compactPortrait
				? sizes.width - compactPortraitLayout.betActionText.horizontalPadding * 2
				: desktop
					? sizes.width * 0.58
					: undefined}
			textMaxHeight={compactPortrait
				? sizes.height - compactPortraitLayout.betActionText.verticalPadding * 2
				: desktop
					? sizes.height * 0.28
					: undefined}
			minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
			textOffsetX={compactPortrait ? compactPortraitLayout.betActionText.offsetX : undefined}
			textOffsetY={desktop
				? desktopHudLayout.spinButton.textOffsetY
				: compactPortrait
					? compactPortraitLayout.betActionText.offsetY
					: undefined}
			{textStyle}
		/>
	{/snippet}
</ButtonBetProvider>
