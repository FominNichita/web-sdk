<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';
	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import {
		DESKTOP_BASE_SIZE,
		DESKTOP_BACKGROUND_WIDTH_LIST,
		MENU_OPTION_BUTTON_GAP,
		MENU_OPTION_BUTTON_SIZES,
	} from '../constants';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const BALANCE_PANEL_WIDTH = 320;
	const BALANCE_PANEL_HEIGHT = 88;
	const BALANCE_TOP_MARGIN = 28;
	const BALANCE_RIGHT_MARGIN = 28;
	const AMOUNT_PANEL_WIDTH = 320;
	const AMOUNT_PANEL_HEIGHT = 88;
	const WIN_BET_PANEL_CENTER_X = 880;
	const WIN_BET_PANEL_Y = DESKTOP_BASE_SIZE * 0.5 - 250;
	const WIN_BET_GAP = 24;
	const WIN_BET_PANEL_OFFSET = AMOUNT_PANEL_WIDTH * 0.5 + WIN_BET_GAP * 0.5;
	const FOOTER_BUTTON_Y = DESKTOP_BASE_SIZE * 0.5 + 16;
	const FOOTER_LEFT_MENU_X = 90;
	const FOOTER_LEFT_BUY_BONUS_X = 228;
	const FOOTER_CENTER_X = 880;
	const FOOTER_BUTTON_WIDTH = 150;
	const FOOTER_BUTTON_GAP = 18;
	const FOOTER_CENTER_OFFSET = FOOTER_BUTTON_WIDTH + FOOTER_BUTTON_GAP;
	const FOOTER_RIGHT_DECREASE_X = 1540;
	const FOOTER_RIGHT_GAP = 88;
	const MENU_OPTION_COUNT = 5;
	const MENU_OPTION_STACK_STEP = MENU_OPTION_BUTTON_SIZES.height + MENU_OPTION_BUTTON_GAP;
	const MENU_OPTION_STACK_START_Y = -(MENU_OPTION_STACK_STEP * (MENU_OPTION_COUNT - 1)) * 0.5;
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
		y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 30}
		pivot={anchorToPivot({
			anchor: { x: 0.5, y: 0 },
			sizes: {
				height: DESKTOP_BASE_SIZE,
				width: DESKTOP_BACKGROUND_WIDTH_LIST.reduce((sum, width) => sum + width, 0),
			},
		})}
	>
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

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_LEFT_MENU_X}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_LEFT_BUY_BONUS_X}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
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

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_RIGHT_DECREASE_X}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container y={FOOTER_BUTTON_Y} x={FOOTER_RIGHT_DECREASE_X + FOOTER_RIGHT_GAP}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>

		{#if stateUi.freeSpinCounterShow}
			<Container y={DESKTOP_BASE_SIZE * 0.5 - 320} x={668}>
				<LabelFreeSpinCounter />
			</Container>
		{/if}
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

			<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 4}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
