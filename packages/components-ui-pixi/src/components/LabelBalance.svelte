<script lang="ts">
	import { Tween } from 'svelte/motion';

	import { stateBet } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';
	import { getContextLayout } from 'utils-layout';

	import UiLabel from './UiLabel.svelte';
	import { uiLabelTextStyles } from './UiLabel.svelte';

	type Props = {
		stacked?: boolean;
		width?: number;
		height?: number;
		labelFontSize?: number;
		valueFontSize?: number;
		horizontalPadding?: number;
		verticalPadding?: number;
		minimumTextScale?: number;
		labelOffsetX?: number;
		labelOffsetY?: number;
		valueOffsetX?: number;
		valueOffsetY?: number;
		labelMaxWidth?: number;
		labelMaxHeight?: number;
		valueMaxWidth?: number;
		valueMaxHeight?: number;
		valueMinimumTextScale?: number;
		useBalanceValueStyle?: boolean;
	};

	const props: Props = $props();
	const { stateLayoutDerived } = getContextLayout();
	const desktop = $derived(stateLayoutDerived.layoutType() === 'desktop');
	const assetKey = $derived(
		desktop ? 'uiRemadeBalanceBg' : 'uiBalanceBg',
	);
	const balanceTween = new Tween(stateBet.balanceAmount);
	const label = $derived(desktop ? 'Balance' : '');
	const value = $derived(numberToCurrencyString(balanceTween.current));
	const labelStyle = $derived({
		...uiLabelTextStyles.balance,
		fill: desktop ? '#C8C0B6' : uiLabelTextStyles.balance.fill,
		stroke: desktop ? { color: '#000000', width: 3 } : uiLabelTextStyles.balance.stroke,
		fontSize: props.labelFontSize ?? 26,
	});
	const balanceValueStyle = $derived({
		...uiLabelTextStyles.balance,
		fill: desktop ? '#F6E6C8' : uiLabelTextStyles.balance.fill,
		fontSize: props.valueFontSize ?? 38,
	});

	$effect(() => {
		balanceTween.set(stateBet.balanceAmount);
	});
</script>

<UiLabel
	tiled
	{label}
	{value}
	{assetKey}
	{labelStyle}
	valueStyle={balanceValueStyle}
	width={props.width}
	height={props.height}
	labelFontSize={props.labelFontSize}
	valueFontSize={props.valueFontSize}
	horizontalPadding={props.horizontalPadding}
	verticalPadding={props.verticalPadding}
	minimumTextScale={props.minimumTextScale}
	labelOffsetX={props.labelOffsetX}
	labelOffsetY={props.labelOffsetY}
	valueOffsetX={props.valueOffsetX}
	valueOffsetY={props.valueOffsetY}
	labelMaxWidth={props.labelMaxWidth}
	labelMaxHeight={props.labelMaxHeight}
	valueMaxWidth={props.valueMaxWidth}
	valueMaxHeight={props.valueMaxHeight}
	valueMinimumTextScale={props.valueMinimumTextScale}
	stacked={props.stacked}
	stackedValueYOffset={0}
/>
