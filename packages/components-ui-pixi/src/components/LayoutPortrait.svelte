<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle } from 'pixi-svelte';
	import { waitForResolve } from 'utils-shared/wait';

	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import ButtonDrawer from './ButtonDrawer.svelte';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';
	import { compactPortraitLayout } from '../compactPortraitLayout';
	import {
		MENU_OPTION_BUTTON_GAP,
		MENU_OPTION_BUTTON_SIZES,
		MENU_BACKDROP_ALPHA,
	} from '../constants';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const BALANCE_PANEL_WIDTH = 320;
	const BALANCE_PANEL_HEIGHT = 88;
	const BALANCE_TOP_MARGIN = 28;
	const BALANCE_RIGHT_MARGIN = 28;
	const MENU_OPTION_COUNT = 3;
	const MENU_OPTION_STACK_STEP = MENU_OPTION_BUTTON_SIZES.height + MENU_OPTION_BUTTON_GAP;
	const MENU_OPTION_STACK_START_Y = -(MENU_OPTION_STACK_STEP * (MENU_OPTION_COUNT - 1)) * 0.5;
	const MENU_CLOSE_MARGIN = 72;
	const compactPortrait = $derived(
		context.stateLayoutDerived.canvasSizes().width <= compactPortraitLayout.maxViewportWidth,
	);
	const PRIMARY_CONTROL_ROW_Y = 1320;
	const SECONDARY_CONTROL_ROW_Y = 1470;
	const CONTROL_SCALE = {
		menu: 1.9,
		autoSpin: 1.75,
		bet: 1.8,
		turbo: 1.8,
		buyBonus: 1.65,
	};
	const MINIMUM_CONTROL_HIT_SIZE = 132;
	const BET_ROW_Y = 1680;
	const BET_STEP_X_OFFSET = 390;
	const BET_STEP_SCALE = 2.05;

	const DRAWER_Y = {
		unfold: 0,
		fold: 550,
	};
	const drawerTween = new Tween(stateUi.drawerFold ? DRAWER_Y.fold : DRAWER_Y.unfold, {
		easing: cubicInOut,
	});

	const DRAWER_BUTTON_Y = {
		unfold: 0,
		fold: 50,
	};
	const drawerButtonTween = new Tween(
		stateUi.drawerFold ? DRAWER_BUTTON_Y.fold : DRAWER_BUTTON_Y.unfold,
		{
			easing: cubicInOut,
		},
	);

	let drawerButtonFadeComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		drawerButtonShow: async () => {
			if (!stateUi.drawerButtonShow) {
				stateUi.drawerButtonShow = true;
				await waitForResolve((resolve) => (drawerButtonFadeComplete = resolve));
			}
		},
		drawerButtonHide: async () => {
			if (stateUi.drawerButtonShow) {
				stateUi.drawerButtonShow = false;
				await waitForResolve((resolve) => (drawerButtonFadeComplete = resolve));
			}
		},
		drawerUnfold: async () => {
			if (stateUi.drawerFold) {
				drawerButtonTween.set(DRAWER_BUTTON_Y.unfold);
				await drawerTween.set(DRAWER_Y.unfold);
			}
		},
		drawerFold: async () => {
			if (!stateUi.drawerFold) {
				drawerButtonTween.set(DRAWER_BUTTON_Y.fold);
				await drawerTween.set(DRAWER_Y.fold);
			}
		},
	});
</script>

<Container x={20}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
	{@render props.logo()}
</Container>

{#if !compactPortrait}
	<MainContainer standard alignHorizontal="right">
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width -
				BALANCE_PANEL_WIDTH * 0.5 -
				BALANCE_RIGHT_MARGIN}
			y={BALANCE_TOP_MARGIN + BALANCE_PANEL_HEIGHT * 0.5}
		>
			{@render props.amountBalance({
				stacked: true,
				width: BALANCE_PANEL_WIDTH,
				height: BALANCE_PANEL_HEIGHT,
			})}
		</Container>
	</MainContainer>
{/if}

{#if compactPortrait}
	<MainContainer standard>
		<Container
			x={compactPortraitLayout.menu.x}
			y={compactPortraitLayout.menu.y}
			scale={compactPortraitLayout.menu.scale}
		>
			{@render props.buttonMenu({
				anchor: 0.5,
				minimumHitSize: compactPortraitLayout.minimumControlHitSize,
			})}
		</Container>

		<Container
			x={compactPortraitLayout.buyBonus.x}
			y={compactPortraitLayout.buyBonus.y}
			scale={compactPortraitLayout.buyBonus.scale}
		>
			{@render props.buttonBuyBonus({
				anchor: 0.5,
				minimumHitSize: compactPortraitLayout.minimumControlHitSize,
			})}
		</Container>
	</MainContainer>
{/if}

<MainContainer standard alignVertical="bottom">
	<!-- drawer container -->
	<Container y={drawerTween.current}>
		{#if compactPortrait}
			<Container
				x={compactPortraitLayout.betAction.x}
				y={compactPortraitLayout.betAction.y}
				scale={compactPortraitLayout.betAction.scale}
			>
				{@render props.buttonBet({
					anchor: 0.5,
					minimumHitSize: compactPortraitLayout.minimumControlHitSize,
				})}
			</Container>

			<Container
				x={compactPortraitLayout.autoSpin.x}
				y={compactPortraitLayout.autoSpin.y}
				scale={compactPortraitLayout.autoSpin.scale}
			>
				{@render props.buttonAutoSpin({
					anchor: 0.5,
					minimumHitSize: compactPortraitLayout.minimumControlHitSize,
				})}
			</Container>

			<Container
				x={compactPortraitLayout.turbo.x}
				y={compactPortraitLayout.turbo.y}
				scale={compactPortraitLayout.turbo.scale}
			>
				{@render props.buttonTurbo({
					anchor: 0.5,
					minimumHitSize: compactPortraitLayout.minimumControlHitSize,
				})}
			</Container>
		{:else}
			<Container x={360} y={SECONDARY_CONTROL_ROW_Y} scale={CONTROL_SCALE.menu}>
				{@render props.buttonMenu({ anchor: 0.5, minimumHitSize: MINIMUM_CONTROL_HIT_SIZE })}
			</Container>

			<Container x={720} y={SECONDARY_CONTROL_ROW_Y} scale={CONTROL_SCALE.buyBonus}>
				{@render props.buttonBuyBonus({
					anchor: 0.5,
					minimumHitSize: MINIMUM_CONTROL_HIT_SIZE,
				})}
			</Container>

			<Container x={540} y={PRIMARY_CONTROL_ROW_Y} scale={CONTROL_SCALE.bet}>
				{@render props.buttonBet({ anchor: 0.5, minimumHitSize: MINIMUM_CONTROL_HIT_SIZE })}
			</Container>

			<Container x={240} y={PRIMARY_CONTROL_ROW_Y} scale={CONTROL_SCALE.autoSpin}>
				{@render props.buttonAutoSpin({
					anchor: 0.5,
					minimumHitSize: MINIMUM_CONTROL_HIT_SIZE,
				})}
			</Container>

			<Container x={840} y={PRIMARY_CONTROL_ROW_Y} scale={CONTROL_SCALE.turbo}>
				{@render props.buttonTurbo({ anchor: 0.5, minimumHitSize: MINIMUM_CONTROL_HIT_SIZE })}
			</Container>
		{/if}
	</Container>

	{#if compactPortrait}
		<Container y={Math.min(drawerTween.current, 350)}>
			<Container x={compactPortraitLayout.winPanel.x} y={compactPortraitLayout.winPanel.y}>
				{@render props.amountWin({
					stacked: true,
					width: compactPortraitLayout.winPanel.width,
					height: compactPortraitLayout.winPanel.height,
					labelFontSize: compactPortraitLayout.text.winLabelSize,
					valueFontSize: compactPortraitLayout.text.winValueSize,
					horizontalPadding: compactPortraitLayout.textPadding.infoPanelHorizontal,
					verticalPadding: compactPortraitLayout.textPadding.infoPanelVertical,
					minimumTextScale: compactPortraitLayout.text.minimumScale,
				})}
			</Container>

			<Container x={compactPortraitLayout.balancePanel.x} y={compactPortraitLayout.balancePanel.y}>
				{@render props.amountBalance({
					stacked: true,
					width: compactPortraitLayout.balancePanel.width,
					height: compactPortraitLayout.balancePanel.height,
					valueFontSize: compactPortraitLayout.text.balanceValueSize,
					horizontalPadding: compactPortraitLayout.textPadding.infoPanelHorizontal,
					verticalPadding: compactPortraitLayout.textPadding.infoPanelVertical,
					minimumTextScale: compactPortraitLayout.text.minimumScale,
				})}
			</Container>
		</Container>
	{:else}
		<Container y={Math.min(drawerTween.current, 350)}>
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 670}
			>
				{@render props.amountWin({ stacked: true })}
			</Container>
		</Container>
	{/if}
</MainContainer>

<MainContainer standard alignVertical="bottom">
	{#if stateUi.freeSpinCounterShow}
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 130}
		>
			<LabelFreeSpinCounter stacked />
		</Container>
	{:else}
		<Container
			x={compactPortrait
				? compactPortraitLayout.selectedBetPanel.x
				: context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={compactPortrait ? compactPortraitLayout.selectedBetPanel.y : BET_ROW_Y}
		>
			{@render props.amountBet({
				stacked: true,
				width: compactPortrait ? compactPortraitLayout.selectedBetPanel.width : undefined,
				height: compactPortrait ? compactPortraitLayout.selectedBetPanel.height : undefined,
				labelFontSize: compactPortrait ? compactPortraitLayout.text.betDisplayLabelSize : undefined,
				valueFontSize: compactPortrait ? compactPortraitLayout.text.betDisplayValueSize : undefined,
				horizontalPadding: compactPortrait
					? compactPortraitLayout.textPadding.betPanelHorizontal
					: undefined,
				verticalPadding: compactPortrait
					? compactPortraitLayout.textPadding.betPanelVertical
					: undefined,
				minimumTextScale: compactPortrait ? compactPortraitLayout.text.minimumScale : undefined,
			})}
		</Container>

		<Container
			x={compactPortrait
				? compactPortraitLayout.minusButton.x
				: context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - BET_STEP_X_OFFSET}
			y={compactPortrait ? compactPortraitLayout.minusButton.y : BET_ROW_Y}
			scale={compactPortrait ? compactPortraitLayout.minusButton.scale : BET_STEP_SCALE}
		>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container
			x={compactPortrait
				? compactPortraitLayout.plusButton.x
				: context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + BET_STEP_X_OFFSET}
			y={compactPortrait ? compactPortraitLayout.plusButton.y : BET_ROW_Y}
			scale={compactPortrait ? compactPortraitLayout.plusButton.scale : BET_STEP_SCALE}
		>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>
	{/if}

	<!-- drawer button -->
	<FadeContainer
		persistent
		show={stateUi.drawerButtonShow}
		oncomplete={drawerButtonFadeComplete}
		y={drawerButtonTween.current}
	>
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 + 440}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 105}
		>
			<ButtonDrawer disabled={!stateUi.drawerButtonShow} anchor={0.5} />
		</Container>
	</FadeContainer>
</MainContainer>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={MENU_BACKDROP_ALPHA}
		anchor={0.5}
		backgroundColor={BLACK}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>

	<MainContainer standard>
		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width - MENU_CLOSE_MARGIN}
			y={MENU_CLOSE_MARGIN}
		>
			{@render props.buttonMenuClose({ anchor: 0.5 })}
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height * 0.5}
		>
			<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 0}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 2}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
