<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Container, Sprite } from 'pixi-svelte';
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
	const arrowRotation = new Tween(0);
	let arrowTurns = 0;
	let arrowAnimationId = 0;
	let openingAutoSpinModal = false;

	const animateArrow = async () => {
		if (!desktop) return;

		const animationId = ++arrowAnimationId;
		arrowTurns += 1;
		const targetRotation = Math.PI * 2 * arrowTurns;
		const overshootRotation = targetRotation + 0.34;

		await arrowRotation.set(overshootRotation, {
			duration: 360,
			easing: (t: number) => 1 - Math.pow(1 - t, 3),
		});

		if (animationId !== arrowAnimationId) return;

		await arrowRotation.set(targetRotation, {
			duration: 170,
			easing: (t: number) => 1 - Math.pow(1 - t, 2),
		});
	};

	const openModalWithAnimation = async () => {
		if (!desktop) {
			openModal();
			return;
		}

		const animationId = arrowAnimationId + 1;
		void animateArrow();
		openingAutoSpinModal = true;
		await new Promise((resolve) => setTimeout(resolve, 220));
		if (animationId !== arrowAnimationId) {
			openingAutoSpinModal = false;
			return;
		}
		openingAutoSpinModal = false;
		openModal();
	};

	const onpress = () => {
		if (openingAutoSpinModal) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (stateBetDerived.hasAutoBetCounter()) {
			void animateArrow();
			stopAutoSpin();
			return;
		}

		void openModalWithAnimation();
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
	{#if desktop}
		<Sprite
			key="uiRemadeAutoSpinArrow"
			anchor={0.5}
			x={sizes.width * 0.5}
			y={sizes.height * 0.5}
			width={desktopHudLayout.autoSpinButton.arrowWidth}
			height={desktopHudLayout.autoSpinButton.arrowHeight}
			rotation={arrowRotation.current}
		/>
	{/if}

	{#if !desktop}
		<Container x={sizes.width * 0.5} y={sizes.height * 0.5}>
			<ButtonBetAutoSpinsCounter />
		</Container>
	{/if}
</UiButton>
