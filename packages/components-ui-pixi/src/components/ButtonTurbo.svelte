<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Sprite } from 'pixi-svelte';
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
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
			? { width: desktopHudLayout.turboButton.width, height: desktopHudLayout.turboButton.height }
			: { width: 136, height: 60 },
	);
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		...(desktop ? { fontSize: desktopHudLayout.turboButton.fontSize } : {}),
		...(compactPortrait ? { fontSize: compactPortraitLayout.turboText.fontSize } : {}),
		fill: '#111111',
	});
	let selected = $state(stateBet.isTurbo);
	const active = $derived(selected);
	const assetKey = $derived(desktop ? 'uiRemadeTurboBg' : active ? 'uiWinBg' : 'uiButtonFooterBg');
	const disabled = $derived(stateBet.isSpaceHold);
	const lightningRotation = new Tween(0);
	let lightningAnimationId = 0;

	const animateLightning = async () => {
		if (!desktop) return;

		const animationId = ++lightningAnimationId;

		await lightningRotation.set(0.3, {
			duration: 120,
			easing: (t: number) => 1 - Math.pow(1 - t, 2),
		});

		if (animationId !== lightningAnimationId) return;

		await lightningRotation.set(-0.08, {
			duration: 110,
			easing: (t: number) => 1 - Math.pow(1 - t, 2),
		});

		if (animationId !== lightningAnimationId) return;

		await lightningRotation.set(0, {
			duration: 150,
			easing: (t: number) => 1 - Math.pow(1 - t, 3),
		});
	};

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		void animateLightning();
		selected = !selected;
		stateBetDerived.updateIsTurbo(selected, { persistent: true });
	};

	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => stateBetDerived.updateIsTurbo(true, { persistent: false }),
		stopButtonEnable: () => stateBetDerived.updateIsTurbo(false, { persistent: false }),
	});
</script>

<UiButton
	{...props}
	{sizes}
	{active}
	{onpress}
	{disabled}
	icon="turbo"
	hideText={desktop}
	{assetKey}
	activeTint={desktop ? 0xffd56a : undefined}
	textMaxWidth={compactPortrait
		? sizes.width - compactPortraitLayout.turboText.horizontalPadding * 2
		: desktop
			? sizes.width * 0.62
			: undefined}
	textMaxHeight={compactPortrait
		? sizes.height - compactPortraitLayout.turboText.verticalPadding * 2
		: desktop
			? sizes.height * 0.42
			: undefined}
	minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
	textOffsetX={compactPortrait ? compactPortraitLayout.turboText.offsetX : undefined}
	textOffsetY={compactPortrait ? compactPortraitLayout.turboText.offsetY : undefined}
	{textStyle}
>
	{#if desktop}
		<Sprite
			key="uiRemadeTurboLightning"
			anchor={0.5}
			x={sizes.width * 0.5}
			y={sizes.height * 0.5}
			width={desktopHudLayout.turboButton.lightningWidth}
			height={desktopHudLayout.turboButton.lightningHeight}
			rotation={lightningRotation.current}
		/>
	{/if}
</UiButton>
