<script lang="ts">
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, Sprite } from 'pixi-svelte';

	import {
		MENU_OPTION_BUTTON_GAP,
		MENU_OPTION_BUTTON_SIZES,
		MENU_BACKDROP_ALPHA,
	} from '../constants';
	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const MENU_OPTION_COUNT = 3;
	const MENU_OPTION_STACK_STEP = MENU_OPTION_BUTTON_SIZES.height + MENU_OPTION_BUTTON_GAP;
	const MENU_OPTION_STACK_START_Y = -(MENU_OPTION_STACK_STEP * (MENU_OPTION_COUNT - 1)) * 0.5;
	const MENU_CLOSE_MARGIN = $derived(
		(20 + 34 * 0.5) / context.stateLayoutDerived.mainLayoutStandard().scale,
	);
</script>

<MainContainer standard>
	<Sprite
		key="uiRemadeLogo"
		anchor={0.5}
		x={desktopHudLayout.logo.x}
		y={desktopHudLayout.logo.y}
		width={desktopHudLayout.logo.width}
		height={desktopHudLayout.logo.height}
	/>
</MainContainer>

<MainContainer standard>
	<Container>
		<Container y={desktopHudLayout.balanceWinPanel.y} x={desktopHudLayout.balanceWinPanel.x}>
			<Sprite
				key="uiRemadeBalanceWinBg"
				anchor={0.5}
				width={desktopHudLayout.balanceWinPanel.width}
				height={desktopHudLayout.balanceWinPanel.height}
			/>

			<Container x={desktopHudLayout.winPanel.offsetX} y={desktopHudLayout.winPanel.offsetY}>
				{@render props.amountWin({
					stacked: true,
					width: desktopHudLayout.winPanel.width,
					height: desktopHudLayout.winPanel.height,
					labelFontSize: desktopHudLayout.winPanel.labelFontSize,
					valueFontSize: desktopHudLayout.winPanel.valueFontSize,
					labelOffsetX: desktopHudLayout.winPanel.labelOffsetX,
					valueOffsetX: desktopHudLayout.winPanel.valueOffsetX,
					labelMaxWidth: desktopHudLayout.winPanel.labelMaxWidth,
					valueMaxWidth: desktopHudLayout.winPanel.valueMaxWidth,
					valueMinimumTextScale: 0.58,
					labelOffsetY: desktopHudLayout.winPanel.labelOffsetY,
					valueOffsetY: desktopHudLayout.winPanel.valueOffsetY,
					labelAnchorX: desktopHudLayout.winPanel.labelAnchorX,
					valueAnchorX: desktopHudLayout.winPanel.valueAnchorX,
					inlineTextGap: 7,
					showBackground: false,
				})}
			</Container>

			<Container
				x={desktopHudLayout.balancePanel.offsetX}
				y={desktopHudLayout.balancePanel.offsetY}
			>
				{@render props.amountBalance({
					stacked: true,
					width: desktopHudLayout.balancePanel.width,
					height: desktopHudLayout.balancePanel.height,
					labelFontSize: desktopHudLayout.balancePanel.labelFontSize,
					valueFontSize: desktopHudLayout.balancePanel.valueFontSize,
					labelOffsetX: desktopHudLayout.balancePanel.labelOffsetX,
					labelOffsetY: desktopHudLayout.balancePanel.labelOffsetY,
					valueOffsetX: desktopHudLayout.balancePanel.valueOffsetX,
					valueOffsetY: desktopHudLayout.balancePanel.valueOffsetY,
					valueMaxWidth: desktopHudLayout.balancePanel.valueMaxWidth,
					valueMinimumTextScale: 0.5,
					labelAnchorX: desktopHudLayout.balancePanel.labelAnchorX,
					valueAnchorX: desktopHudLayout.balancePanel.valueAnchorX,
					useBalanceValueStyle: true,
					showBackground: false,
				})}
			</Container>
		</Container>

		<Container y={desktopHudLayout.betPanel.y} x={desktopHudLayout.betPanel.x}>
			{@render props.amountBet({
				stacked: true,
				width: desktopHudLayout.betPanel.width,
				height: desktopHudLayout.betPanel.height,
				labelFontSize: desktopHudLayout.betPanel.labelFontSize,
				valueFontSize: desktopHudLayout.betPanel.valueFontSize,
				labelOffsetX: desktopHudLayout.betPanel.labelOffsetX,
				labelOffsetY: desktopHudLayout.betPanel.labelOffsetY,
				valueOffsetX: desktopHudLayout.betPanel.valueOffsetX,
				valueOffsetY: desktopHudLayout.betPanel.valueOffsetY,
				valueMaxWidth: desktopHudLayout.betPanel.valueMaxWidth,
				valueMinimumTextScale: 0.54,
				labelAnchorX: desktopHudLayout.betPanel.labelAnchorX,
				valueAnchorX: desktopHudLayout.betPanel.valueAnchorX,
				useBalanceValueStyle: true,
			})}

			<Container
				x={desktopHudLayout.betArrowDown.offsetX}
				y={desktopHudLayout.betArrowDown.offsetY}
			>
				{@render props.buttonDecrease({ anchor: 0.5 })}
			</Container>

			<Container
				x={desktopHudLayout.betArrowUp.offsetX}
				y={desktopHudLayout.betArrowUp.offsetY}
			>
				{@render props.buttonIncrease({ anchor: 0.5 })}
			</Container>
		</Container>

		<Container y={desktopHudLayout.menuButton.y} x={desktopHudLayout.menuButton.x}>
			{@render props.buttonMenu({ anchor: 0.5 })}
		</Container>

		<Container y={desktopHudLayout.buyBonusButton.y} x={desktopHudLayout.buyBonusButton.x}>
			{@render props.buttonBuyBonus({ anchor: 0.5 })}
		</Container>

		<Container y={desktopHudLayout.spinCluster.y} x={desktopHudLayout.spinCluster.x}>
			<Sprite
				key="uiRemadeSpinClusterBg"
				anchor={0.5}
				width={desktopHudLayout.spinCluster.width}
				height={desktopHudLayout.spinCluster.height}
			/>

			<Container
				x={desktopHudLayout.autoSpinButton.offsetX}
				y={desktopHudLayout.autoSpinButton.offsetY}
			>
				{@render props.buttonAutoSpin({ anchor: 0.5 })}
			</Container>

			<Container x={desktopHudLayout.spinButton.offsetX} y={desktopHudLayout.spinButton.offsetY}>
				{@render props.buttonBet({ anchor: 0.5 })}
			</Container>

			<Container
				x={desktopHudLayout.turboButton.offsetX}
				y={desktopHudLayout.turboButton.offsetY}
			>
				{@render props.buttonTurbo({ anchor: 0.5 })}
			</Container>
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
