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
		MENU_BACKDROP_ALPHA,
	} from '../constants';
	import type { LayoutUiProps } from '../types';
	import { getContext } from '../context';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const shortLandscape = $derived(context.stateLayoutDerived.canvasSizes().height <= 480);
	const BALANCE_PANEL_WIDTH = 320;
	const BALANCE_PANEL_HEIGHT = 88;
	const BALANCE_TOP_MARGIN = 24;
	const BALANCE_RIGHT_MARGIN = 24;
	const AMOUNT_PANEL_WIDTH = 320;
	const AMOUNT_PANEL_HEIGHT = 88;
	const AMOUNT_TEXT_LAYOUT = {
		headingFontSize: 25,
		valueFontSize: 31,
		headingCenterX: -38,
		valueCenterX: 38,
		headingMaxWidth: 62,
		valueMaxWidth: 210,
		maxHeight: 48,
		minimumValueFontSize: 18,
	};
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
	const FOOTER_CONTENT_WIDTH = LANDSCAPE_BACKGROUND_WIDTH_LIST.reduce(
		(sum, width) => sum + width,
		0,
	);
	const SHORT_FOOTER_SIDE_PADDING = 200;
	const SHORT_FOOTER_BAR_HEIGHT = 220;
	// footerBG_Bar.png's full-width stone body occupies source rows 39..114 of 115.
	const SHORT_FOOTER_BAR_BODY_CENTER_RATIO = 76.5 / 115;
	const SHORT_FOOTER_BAR_Y_OFFSET =
		-(SHORT_FOOTER_BAR_BODY_CENTER_RATIO - 0.5) * SHORT_FOOTER_BAR_HEIGHT;
	const FOOTER_BAR_HEIGHT = $derived(shortLandscape ? SHORT_FOOTER_BAR_HEIGHT : 110);
	const FOOTER_BAR_Y = $derived(
		FOOTER_BUTTON_Y + (shortLandscape ? SHORT_FOOTER_BAR_Y_OFFSET : -10),
	);
	const SHORT_FOOTER_SCALE = 1.5;
	const SHORT_FOOTER_MINIMUM_HIT_SIZE = 132;
	const SHORT_FOOTER_POSITIONS = {
		menu: 130,
		buyBonus: 330,
		autoSpin: 650,
		bet: 910,
		turbo: 1170,
		decrease: 1500,
		increase: 1650,
	};
	const SHORT_FOOTER_LEFT =
		SHORT_FOOTER_POSITIONS.menu - (92 * SHORT_FOOTER_SCALE) / 2 - SHORT_FOOTER_SIDE_PADDING;
	const SHORT_FOOTER_RIGHT =
		SHORT_FOOTER_POSITIONS.increase + (65 * SHORT_FOOTER_SCALE) / 2 + SHORT_FOOTER_SIDE_PADDING;
	const SHORT_FOOTER_BAR_WIDTH = SHORT_FOOTER_RIGHT - SHORT_FOOTER_LEFT;
	const SHORT_FOOTER_BAR_CENTER_X = (SHORT_FOOTER_LEFT + SHORT_FOOTER_RIGHT) * 0.5;
	const MENU_OPTION_COUNT = 3;
	const MENU_OPTION_STACK_STEP = MENU_OPTION_BUTTON_SIZES.height + MENU_OPTION_BUTTON_GAP;
	const MENU_OPTION_STACK_START_Y = -(MENU_OPTION_STACK_STEP * (MENU_OPTION_COUNT - 1)) * 0.5;
	const MENU_CLOSE_MARGIN = $derived(
		(context.stateLayoutDerived.canvasSizes().height <= 500 ? 8 + 34 * 0.5 : 20 + 34 * 0.5) /
			context.stateLayoutDerived.mainLayoutStandard().scale,
	);
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
				width: FOOTER_CONTENT_WIDTH,
			},
		})}
	>
		{#if props.footerBar}
			<Container
				x={shortLandscape ? SHORT_FOOTER_BAR_CENTER_X : FOOTER_CONTENT_WIDTH * 0.5}
				y={FOOTER_BAR_Y}
			>
				{@render props.footerBar({
					width: shortLandscape ? SHORT_FOOTER_BAR_WIDTH : FOOTER_CONTENT_WIDTH,
					height: FOOTER_BAR_HEIGHT,
				})}
			</Container>
		{/if}

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape ? SHORT_FOOTER_POSITIONS.menu : FOOTER_LEFT_MENU_X}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonMenu({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape ? SHORT_FOOTER_POSITIONS.buyBonus : FOOTER_LEFT_BUY_BONUS_X}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonBuyBonus({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>

		<Container y={WIN_BET_PANEL_Y} x={WIN_BET_PANEL_CENTER_X - WIN_BET_PANEL_OFFSET}>
			{@render props.amountWin({
				stacked: !shortLandscape,
				width: AMOUNT_PANEL_WIDTH,
				height: AMOUNT_PANEL_HEIGHT,
				labelFontSize: shortLandscape ? AMOUNT_TEXT_LAYOUT.headingFontSize : undefined,
				valueFontSize: shortLandscape ? AMOUNT_TEXT_LAYOUT.valueFontSize : undefined,
				labelOffsetX: shortLandscape ? AMOUNT_TEXT_LAYOUT.headingCenterX : undefined,
				valueOffsetX: shortLandscape ? AMOUNT_TEXT_LAYOUT.valueCenterX : undefined,
				labelMaxWidth: shortLandscape ? AMOUNT_TEXT_LAYOUT.headingMaxWidth : undefined,
				labelMaxHeight: shortLandscape ? AMOUNT_TEXT_LAYOUT.maxHeight : undefined,
				valueMaxWidth: shortLandscape ? AMOUNT_TEXT_LAYOUT.valueMaxWidth : undefined,
				valueMaxHeight: shortLandscape ? AMOUNT_TEXT_LAYOUT.maxHeight : undefined,
				valueMinimumTextScale: shortLandscape
					? AMOUNT_TEXT_LAYOUT.minimumValueFontSize / AMOUNT_TEXT_LAYOUT.valueFontSize
					: undefined,
			})}
		</Container>

		<Container y={WIN_BET_PANEL_Y} x={WIN_BET_PANEL_CENTER_X + WIN_BET_PANEL_OFFSET}>
			{@render props.amountBet({
				stacked: !shortLandscape,
				width: AMOUNT_PANEL_WIDTH,
				height: AMOUNT_PANEL_HEIGHT,
				labelFontSize: shortLandscape ? AMOUNT_TEXT_LAYOUT.headingFontSize : undefined,
				valueFontSize: shortLandscape ? AMOUNT_TEXT_LAYOUT.valueFontSize : undefined,
				labelOffsetX: shortLandscape ? AMOUNT_TEXT_LAYOUT.headingCenterX : undefined,
				valueOffsetX: shortLandscape ? AMOUNT_TEXT_LAYOUT.valueCenterX : undefined,
				labelMaxWidth: shortLandscape ? AMOUNT_TEXT_LAYOUT.headingMaxWidth : undefined,
				labelMaxHeight: shortLandscape ? AMOUNT_TEXT_LAYOUT.maxHeight : undefined,
				valueMaxWidth: shortLandscape ? AMOUNT_TEXT_LAYOUT.valueMaxWidth : undefined,
				valueMaxHeight: shortLandscape ? AMOUNT_TEXT_LAYOUT.maxHeight : undefined,
				valueMinimumTextScale: shortLandscape
					? AMOUNT_TEXT_LAYOUT.minimumValueFontSize / AMOUNT_TEXT_LAYOUT.valueFontSize
					: undefined,
			})}
		</Container>

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape ? SHORT_FOOTER_POSITIONS.decrease : FOOTER_RIGHT_DECREASE_X}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonDecrease({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape
				? SHORT_FOOTER_POSITIONS.increase
				: FOOTER_RIGHT_DECREASE_X + FOOTER_RIGHT_GAP}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonIncrease({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape ? SHORT_FOOTER_POSITIONS.autoSpin : FOOTER_CENTER_X - FOOTER_CENTER_OFFSET}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonAutoSpin({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape ? SHORT_FOOTER_POSITIONS.bet : FOOTER_CENTER_X}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonBet({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>

		<Container
			y={FOOTER_BUTTON_Y}
			x={shortLandscape ? SHORT_FOOTER_POSITIONS.turbo : FOOTER_CENTER_X + FOOTER_CENTER_OFFSET}
			scale={shortLandscape ? SHORT_FOOTER_SCALE : 1}
		>
			{@render props.buttonTurbo({
				anchor: 0.5,
				minimumHitSize: shortLandscape ? SHORT_FOOTER_MINIMUM_HIT_SIZE : undefined,
			})}
		</Container>
	</Container>
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
