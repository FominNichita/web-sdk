<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { compactPortraitLayout } from '../compactPortraitLayout';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const { stateXstateDerived, eventEmitter } = context;
	const compactPortrait = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' &&
			context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const desktop = $derived(context.stateLayoutDerived.layoutType() === 'desktop');
	const sizes = $derived(
		desktop
			? {
					width: desktopHudLayout.buyBonusButton.width,
					height: desktopHudLayout.buyBonusButton.height,
				}
			: compactPortrait
				? compactPortraitLayout.topButton
				: { width: 152, height: 58 },
	);
	const disabled = $derived(!stateXstateDerived.isIdle());
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');
	const label = $derived(active ? i18nDerived.disable() : i18nDerived.buyBonus());
	const displayLabel = $derived(
		(compactPortrait || desktop) && !active ? label.replace(/\s+/, '\n') : label,
	);
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		fontSize: desktop
			? desktopHudLayout.buyBonusButton.fontSize
			: compactPortrait
			? compactPortraitLayout.text.buyBonusSize
			: context.stateLayoutDerived.layoutType() === 'portrait'
				? 34
				: 28,
		fill: '#E4C5AA',
		stroke: { color: '#000000', width: 3 },
		wordWrap: false,
		...(desktop
			? {
					fill: '#F8D36A',
					stroke: { color: '#090401', width: 5 },
					align: 'center' as const,
					lineHeight: 35,
					fontWeight: '700',
					dropShadow: {
						color: '#000000',
						blur: 2,
						angle: Math.PI / 2,
						distance: 6,
						alpha: 0.85,
					},
				}
			: {}),
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
	assetKey={desktop ? 'uiRemadeBuyBonusBg' : 'uiButtonBuyBonusBg'}
	textMaxWidth={compactPortrait
		? sizes.width * 0.88
		: desktop
			? sizes.width * 0.74
			: undefined}
	textMaxHeight={compactPortrait
		? sizes.height * 0.96
		: desktop
			? sizes.height * 0.74
			: undefined}
	textOffsetY={compactPortrait ? 1 : undefined}
	minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
	{textStyle}
/>
