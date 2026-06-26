<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateUi } from 'state-shared';

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
	const desktop = $derived(context.stateLayoutDerived.layoutType() === 'desktop');
	const sizes = $derived(
		desktop
			? { width: desktopHudLayout.menuButton.width, height: desktopHudLayout.menuButton.height }
			: compactPortrait
				? compactPortraitLayout.topButton
				: { width: 92, height: 58 },
	);
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		...(desktop ? { fontSize: desktopHudLayout.menuButton.fontSize } : {}),
		...(compactPortrait ? { fontSize: compactPortraitLayout.text.menuSize } : {}),
		fill: '#E4C5AA',
		stroke: { color: '#000000', width: 3 },
	});

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = true;
	};
</script>

<UiButton
	{...props}
	{sizes}
	{onpress}
	icon="menu"
	hideText={desktop}
	assetKey={desktop ? 'uiRemadeMenuBg' : 'uiButtonMenuBg'}
	textMaxWidth={compactPortrait
		? sizes.width * (1 - compactPortraitLayout.textPadding.buttonHorizontalRatio * 2)
		: desktop
			? sizes.width * 0.78
			: undefined}
	textMaxHeight={compactPortrait
		? sizes.height * (1 - compactPortraitLayout.textPadding.buttonVerticalRatio * 2)
		: desktop
			? sizes.height * 0.32
			: undefined}
	minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
	{textStyle}
/>
