<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import { compactPortraitLayout } from '../compactPortraitLayout';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const compactPortrait = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' &&
			context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const sizes = { width: 136, height: 60 };
	const textStyle = $derived({
		fontFamily: 'Sancreek',
		...(compactPortrait ? { fontSize: compactPortraitLayout.text.turboSize } : {}),
		fill: '#111111',
	});
	let selected = $state(stateBet.isTurbo);
	const active = $derived(selected);
	const assetKey = $derived(active ? 'uiWinBg' : 'uiButtonFooterBg');
	const disabled = $derived(stateBet.isSpaceHold);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
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
	{assetKey}
	textMaxWidth={compactPortrait
		? sizes.width * (1 - compactPortraitLayout.textPadding.buttonHorizontalRatio * 2)
		: undefined}
	textMaxHeight={compactPortrait
		? sizes.height * (1 - compactPortraitLayout.textPadding.buttonVerticalRatio * 2)
		: undefined}
	minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
	{textStyle}
/>
