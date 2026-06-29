<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { stateBet, stateModal, stateUi } from 'state-shared';
	import { MainContainer } from 'components-layout';
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { Button } from 'components-pixi';

	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';
	import { desktopHudLayout } from '../desktopHudLayout';

	const props: LayoutUiProps = $props();
	const context = getContext();
	const hasWinAmount = $derived(stateBet.winBookEventAmount > 0);
	const balanceWinPanelX = new Tween(
		desktopHudLayout.balanceWinPanel.x + desktopHudLayout.balanceWinPanel.emptyOffsetX,
	);
	const balanceWinPanelWidth = new Tween(desktopHudLayout.balanceWinPanel.emptyWidth);
	const balancePanelOffsetX = new Tween(0);
	const showAutoSpinCounter = $derived(stateBet.autoSpinsCounter > 0);
	const autoSpinCounterText = $derived(
		stateBet.autoSpinsCounter === Infinity ? '∞' : `${stateBet.autoSpinsCounter}`,
	);
	const autoSpinCounterFontSize = $derived(
		stateBet.autoSpinsCounter === Infinity
			? desktopHudLayout.autoSpinCounter.infinityFontSize
			: desktopHudLayout.autoSpinCounter.fontSize,
	);
	const autoSpinCounterScale = $derived.by(() => {
		const estimatedWidth =
			autoSpinCounterText.length *
			autoSpinCounterFontSize *
			(stateBet.autoSpinsCounter === Infinity ? 0.7 : 0.66);

		return Math.min(1, desktopHudLayout.autoSpinCounter.maxWidth / estimatedWidth);
	});
	const autoSpinCounterStyle = $derived({
		fontFamily: 'Sancreek',
		fontSize: autoSpinCounterFontSize,
		fontWeight: '700',
		fill: '#D8D1CC',
		stroke: {
			color: '#1A100C',
			width: 6,
			join: 'round' as const,
		},
		dropShadow: {
			color: '#000000',
			alpha: 0.72,
			blur: 2,
			distance: 4,
			angle: Math.PI * 0.5,
		},
		letterSpacing: desktopHudLayout.autoSpinCounter.letterSpacing,
	});
	const openPayTable = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = false;
		stateModal.modal = { name: 'payTable' };
	};
	const openSettings = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = false;
		stateModal.modal = { name: 'settings' };
	};

	$effect(() => {
		const duration = 260;
		const easing = (t: number) => 1 - Math.pow(1 - t, 3);

		balanceWinPanelX.set(
			desktopHudLayout.balanceWinPanel.x +
				(hasWinAmount ? 0 : desktopHudLayout.balanceWinPanel.emptyOffsetX),
			{ duration, easing },
		);
		balanceWinPanelWidth.set(
			hasWinAmount
				? desktopHudLayout.balanceWinPanel.width
				: desktopHudLayout.balanceWinPanel.emptyWidth,
			{ duration, easing },
		);
		balancePanelOffsetX.set(hasWinAmount ? desktopHudLayout.balancePanel.offsetX : 0, {
			duration,
			easing,
		});
	});
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
		<Container y={desktopHudLayout.balanceWinPanel.y} x={balanceWinPanelX.current}>
			<Sprite
				key="uiRemadeBalanceWinBg"
				anchor={0.5}
				width={balanceWinPanelWidth.current}
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
				x={balancePanelOffsetX.current}
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

			{#if showAutoSpinCounter}
				<Container
					x={desktopHudLayout.autoSpinCounter.offsetX}
					y={desktopHudLayout.autoSpinCounter.offsetY}
					rotation={desktopHudLayout.autoSpinCounter.rotation}
					scale={autoSpinCounterScale}
				>
					<Text
						anchor={0.5}
						text={autoSpinCounterText}
						style={autoSpinCounterStyle}
					/>
				</Container>
			{/if}

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
	<MainContainer standard>
		<Container
			x={desktopHudLayout.menuButton.x + desktopHudLayout.menuExpansion.offsetX}
			y={desktopHudLayout.menuButton.y + desktopHudLayout.menuExpansion.offsetY}
		>
			<Sprite
				key="uiRemadeSettingsBg"
				anchor={0.5}
				width={desktopHudLayout.menuExpansion.width}
				height={desktopHudLayout.menuExpansion.height}
			/>

			<Button
				anchor={0.5}
				x={0}
				y={desktopHudLayout.menuExpansion.infoOffsetY}
				sizes={{
					width: desktopHudLayout.menuExpansion.hitSize,
					height: desktopHudLayout.menuExpansion.hitSize,
				}}
				onpress={openPayTable}
			>
				{#snippet children({ center, pressed })}
					<Sprite
						key="uiRemadeInfoIcon"
						anchor={0.5}
						x={center.x}
						y={center.y}
						width={desktopHudLayout.menuExpansion.iconSize}
						height={desktopHudLayout.menuExpansion.iconSize}
						alpha={pressed ? 0.82 : 1}
					/>
				{/snippet}
			</Button>

			<Button
				anchor={0.5}
				x={0}
				y={desktopHudLayout.menuExpansion.settingsOffsetY}
				sizes={{
					width: desktopHudLayout.menuExpansion.hitSize,
					height: desktopHudLayout.menuExpansion.hitSize,
				}}
				onpress={openSettings}
			>
				{#snippet children({ center, pressed })}
					<Sprite
						key="uiRemadeSoundIcon"
						anchor={0.5}
						x={center.x}
						y={center.y}
						width={desktopHudLayout.menuExpansion.iconSize}
						height={desktopHudLayout.menuExpansion.iconSize}
						alpha={pressed ? 0.82 : 1}
					/>
				{/snippet}
			</Button>
		</Container>
	</MainContainer>
{/if}
