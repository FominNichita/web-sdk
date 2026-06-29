<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Sprite } from 'pixi-svelte';
	import { Button } from 'components-pixi';
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
	const desktop = $derived(['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()));
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
	const spriteRotation = new Tween(0);
	let rotationTurns = 0;
	let animatingMenuToggle = false;
	let displayedSymbolKey = $state<'uiRemadeMenuSymbol' | 'uiRemadeCloseBg'>('uiRemadeMenuSymbol');

	$effect(() => {
		if (animatingMenuToggle || !desktop) return;
		displayedSymbolKey = stateUi.menuOpen ? 'uiRemadeCloseBg' : 'uiRemadeMenuSymbol';
	});

	const animateDesktopToggle = async () => {
		if (animatingMenuToggle) return;

		const nextOpen = !stateUi.menuOpen;
		animatingMenuToggle = true;
		rotationTurns += 1;
		await spriteRotation.set(Math.PI * 2 * rotationTurns, {
			duration: 330,
			easing: (t: number) => 1 - Math.pow(1 - t, 3),
		});
		stateUi.menuOpen = nextOpen;
		displayedSymbolKey = nextOpen ? 'uiRemadeCloseBg' : 'uiRemadeMenuSymbol';
		animatingMenuToggle = false;
	};

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (desktop) {
			void animateDesktopToggle();
			return;
		}

		stateUi.menuOpen = !stateUi.menuOpen;
	};
</script>

{#if desktop}
	<Button {...props} {sizes} {onpress}>
		{#snippet children({ center, pressed })}
			<Sprite
				key="uiRemadeMenuBg"
				anchor={0.5}
				x={center.x}
				y={center.y}
				width={sizes.width}
				height={sizes.height}
				alpha={pressed ? 0.9 : 1}
			/>

			<Sprite
				key={displayedSymbolKey}
				anchor={0.5}
				x={center.x}
				y={center.y}
				width={desktopHudLayout.menuButton.symbolWidth}
				height={desktopHudLayout.menuButton.symbolHeight}
				rotation={spriteRotation.current}
				alpha={pressed ? 0.86 : 1}
			/>
		{/snippet}
	</Button>
{:else}
	<UiButton
		{...props}
		{sizes}
		{onpress}
		icon="menu"
		assetKey="uiButtonMenuBg"
		textMaxWidth={compactPortrait
			? sizes.width * (1 - compactPortraitLayout.textPadding.buttonHorizontalRatio * 2)
			: undefined}
		textMaxHeight={compactPortrait
			? sizes.height * (1 - compactPortraitLayout.textPadding.buttonVerticalRatio * 2)
			: undefined}
		minimumTextScale={compactPortrait ? compactPortraitLayout.text.minimumScale : undefined}
		{textStyle}
	/>
{/if}
