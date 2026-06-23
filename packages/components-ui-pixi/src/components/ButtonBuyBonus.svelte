<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { compactPortraitLayout } from '../compactPortraitLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const { stateXstateDerived, eventEmitter } = context;
	const compactPortrait = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' &&
			context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const sizes = $derived(
		compactPortrait ? compactPortraitLayout.topButton : { width: 152, height: 58 },
	);
	const disabled = $derived(!stateXstateDerived.isIdle());
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');
	const label = $derived(active ? i18nDerived.disable() : i18nDerived.buyBonus());
	const displayLabel = $derived(
		compactPortrait && !active ? label.replace(/\s+/, '\n') : label,
	);
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		fontSize: compactPortrait
			? compactPortraitLayout.text.buyBonusSize
			: context.stateLayoutDerived.layoutType() === 'portrait'
				? 34
				: 28,
		fill: '#E4C5AA',
		stroke: { color: '#000000', width: 3 },
		wordWrap: false,
		...(compactPortrait ? { align: 'center' as const, lineHeight: 32 } : {}),
	});

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
	label={displayLabel}
	assetKey="uiButtonBuyBonusBg"
	textMaxWidth={compactPortrait
		? sizes.width * 0.88
		: undefined}
	textMaxHeight={compactPortrait
		? sizes.height * 0.96
		: undefined}
	textOffsetY={compactPortrait ? 1 : undefined}
	minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
	{textStyle}
/>
