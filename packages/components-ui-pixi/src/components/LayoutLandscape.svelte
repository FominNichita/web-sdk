<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, anchorToPivot } from 'pixi-svelte';

	import { LANDSCAPE_BASE_SIZE, LANDSCAPE_BACKGROUND_WIDTH_LIST } from '../constants';
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
		<Container y={LANDSCAPE_BASE_SIZE * 0.5 - 90} x={85 + 20} scale={0.8}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * 0.5 - 90} x={220 + 20} scale={0.8}>
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

		<Container y={LANDSCAPE_BASE_SIZE * 0.5 - 90} x={1580} scale={0.8}>
			{@render props.buttonDecrease({ anchor: 0.5 })}
		</Container>

		<Container y={LANDSCAPE_BASE_SIZE * 0.5 - 90} x={1715} scale={0.8}>
			{@render props.buttonIncrease({ anchor: 0.5 })}
		</Container>
	</Container>

	<Container
		x={context.stateLayoutDerived.mainLayoutStandard().width - 60}
		y={context.stateLayoutDerived.mainLayoutStandard().height * 0.5}
		pivot={anchorToPivot({
			anchor: { x: 1, y: 0.5 },
			sizes: {
				height: LANDSCAPE_BASE_SIZE,
				width: LANDSCAPE_BASE_SIZE,
			},
		})}
	>
		<Container x={LANDSCAPE_BASE_SIZE * 0.5} y={LANDSCAPE_BASE_SIZE * 0.5 - 140} scale={0.8}>
			{@render props.buttonAutoSpin({ anchor: 0.5 })}
		</Container>

		<Container x={LANDSCAPE_BASE_SIZE * 0.5} y={LANDSCAPE_BASE_SIZE * 0.5} scale={0.8}>
			{@render props.buttonBet({ anchor: 0.5 })}
		</Container>

		<Container x={LANDSCAPE_BASE_SIZE * 0.5} y={LANDSCAPE_BASE_SIZE * 0.5 + 140} scale={0.8}>
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

	<MainContainer standard alignVertical="bottom">
		<Container
			x={165}
			y={context.stateLayoutDerived.mainLayoutStandard().height - LANDSCAPE_BASE_SIZE - 130}
		>
			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 3}>
				{@render props.buttonPayTable({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 2}>
				{@render props.buttonGameRules({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150 - 170 * 1}>
				{@render props.buttonSettings({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5 - 150}>
				{@render props.buttonSoundSwitch({ anchor: 0.5 })}
			</Container>

			<Container scale={0.8} y={LANDSCAPE_BASE_SIZE * 0.5}>
				{@render props.buttonMenuClose({ anchor: 0.5 })}
			</Container>
		</Container>
	</MainContainer>
{/if}
