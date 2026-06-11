<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import {
		LANDSCAPE_BASE_SIZE,
		LANDSCAPE_BACKGROUND_WIDTH_LIST,
		MENU_OPTION_BUTTON_GAP,
		MENU_OPTION_BUTTON_SIZES,
	} from '../constants';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const BALANCE_PANEL_WIDTH = 320;
	const BALANCE_PANEL_HEIGHT = 88;
	const BALANCE_TOP_MARGIN = 24;
	const BALANCE_RIGHT_MARGIN = 24;
	const AMOUNT_PANEL_WIDTH = 320;
	const AMOUNT_PANEL_HEIGHT = 88;
	const WIN_BET_PANEL_CENTER_X = 910;
	const WIN_BET_PANEL_Y = LANDSCAPE_BASE_SIZE * 0.5 - 120;
	const WIN_BET_GAP = 24;
	const WIN_BET_PANEL_OFFSET = AMOUNT_PANEL_WIDTH * 0.5 + WIN_BET_GAP * 0.5;
	const FOOTER_BUTTON_Y = LANDSCAPE_BASE_SIZE * 0.5 + 6;
	const FOOTER_LEFT_MENU_X = 130;
	const FOOTER_LEFT_BUY_BONUS_X = 268;
	const FOOTER_CENTER_X = 910;
	const FOOTER_BUTTON_WIDTH = 136;
	const FOOTER_BUTTON_GAP = 24;
	const FOOTER_CENTER_OFFSET = FOOTER_BUTTON_WIDTH + FOOTER_BUTTON_GAP;
	const FOOTER_RIGHT_DECREASE_X = 1568;
	const FOOTER_RIGHT_GAP = 88;
	const FOOTER_BAR_WIDTH = LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0);
	const FOOTER_BAR_HEIGHT = 110;
	const FOOTER_BAR_Y = FOOTER_BUTTON_Y - 10;
	const MENU_OPTION_COUNT = 4;
	const MENU_OPTION_STACK_STEP = MENU_OPTION_BUTTON_SIZES.height + MENU_OPTION_BUTTON_GAP;
	const MENU_OPTION_STACK_START_Y = -(MENU_OPTION_STACK_STEP * (MENU_OPTION_COUNT - 1)) * 0.5;
	const MENU_CLOSE_MARGIN = 72;
</script>

<Container x={20}>
	{@render props.gameName()}
</Container>

<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
	{@render props.logo()}
</Container>

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

<MainContainer standard alignVertical="bottom">
	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
		y={context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 40}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: LANDSCAPE_BASE_SIZE,
				width: LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>
		{#if props.footerBar}
			<Container x={FOOTER_BAR_WIDTH * 0.5} y={FOOTER_BAR_Y}>
				{@render props.footerBar({
					width: FOOTER_BAR_WIDTH,
					height: FOOTER_BAR_HEIGHT,
				})}
			</Container>
		{/if}

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_LEFT_MENU_X}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_LEFT_BUY_BONUS_X}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container y={WIN_BET_PANEL_Y} x={WIN_BET_PANEL_CENTER_X - WIN_BET_PANEL_OFFSET}>
			{@render props.amountWin({
				stacked: true,
				width: AMOUNT_PANEL_WIDTH,
				height: AMOUNT_PANEL_HEIGHT,
			})}
		</Container>

		<Container y={WIN_BET_PANEL_Y} x={WIN_BET_PANEL_CENTER_X + WIN_BET_PANEL_OFFSET}>
			{@render props.amountBet({
				stacked: true,
				width: AMOUNT_PANEL_WIDTH,
				height: AMOUNT_PANEL_HEIGHT,
			})}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_RIGHT_DECREASE_X}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_RIGHT_DECREASE_X + FOOTER_RIGHT_GAP}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_CENTER_X - FOOTER_CENTER_OFFSET}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_CENTER_X}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_CENTER_X + FOOTER_CENTER_OFFSET}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>
	</Container>
</MainContainer>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={0.5}
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
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 2}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 3}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
