<script lang="ts">
	import { Container } from 'pixi-svelte';
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived, stateModal } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import ButtonBetAutoSpinsCounter from './ButtonBetAutoSpinsCounter.svelte';
	import { compactPortraitLayout } from '../compactPortraitLayout';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const compactPortrait = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' &&
			context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const desktop = $derived(['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()));
	const sizes = $derived(
		desktop
			? {
					width: desktopHudLayout.autoSpinButton.width,
					height: desktopHudLayout.autoSpinButton.height,
				}
			: { width: 146, height: 60 },
	);
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		...(desktop
			? {
					fontSize: desktopHudLayout.autoSpinButton.fontSize,
					lineHeight: desktopHudLayout.autoSpinButton.fontSize,
					align: 'center' as const,
				}
			: {}),
		...(compactPortrait
			? {
					fontSize: compactPortraitLayout.autoSpinText.fontSize,
					lineHeight: compactPortraitLayout.autoSpinText.lineHeight,
					align: 'center' as const,
				}
			: {}),
		fill: '#111111',
	});
	const active = $derived(stateBetDerived.hasAutoBetCounter());
	const assetKey = $derived(
		desktop ? 'uiRemadeAutoSpinBg' : active ? 'uiWinBg' : 'uiButtonFooterBg',
	);
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
	hideText={desktop || active}
	icon="autoSpin"
	label={desktop || compactPortrait ? 'AUTO\nSPIN' : undefined}
	{assetKey}
	textMaxWidth={compactPortrait
		? sizes.width - compactPortraitLayout.autoSpinText.horizontalPadding * 2
		: desktop
			? sizes.width * 0.62
			: undefined}
	textMaxHeight={compactPortrait
		? sizes.height - compactPortraitLayout.autoSpinText.verticalPadding * 2
		: desktop
			? sizes.height * 0.46
			: undefined}
	minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
	textOffsetX={compactPortrait ? compactPortraitLayout.autoSpinText.offsetX : undefined}
	textOffsetY={compactPortrait ? compactPortraitLayout.autoSpinText.offsetY : undefined}
	{textStyle}
>
	{#if !desktop}
		<Container x={sizes.width * 0.5} y={sizes.height * 0.5}>
			<ButtonBetAutoSpinsCounter />
		</Container>
	{/if}
</UiButton>
