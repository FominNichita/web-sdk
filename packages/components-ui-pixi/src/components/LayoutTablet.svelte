<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';
	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import { DESKTOP_BASE_SIZE, DESKTOP_BACKGROUND_WIDTH_LIST } from '../constants';

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

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={20}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={20 + 180}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={-10 + 180 * 4}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={-10 + 180 * 5}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={-10 + 180 * 6}>
			{@render props.buttonTurbo({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={1560}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container y={DESKTOP_BASE_SIZE * 0.5} x={1560 + 180}>
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

	<MainContainer standard alignVertical="bottom">
		<Container
			x={100}
			y={context.stateLayoutDerived.mainLayoutStandard().height - DESKTOP_BASE_SIZE - 30}
		>
			<Container y={DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container y={DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container y={DESKTOP_BASE_SIZE * 0.5 - 185 - 210 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container y={DESKTOP_BASE_SIZE * 0.5 - 185}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container y={DESKTOP_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
