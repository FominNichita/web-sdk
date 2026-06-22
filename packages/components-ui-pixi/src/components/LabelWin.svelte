<script lang="ts">
	import { Tween } from 'svelte/motion';

	import { stateBet } from 'state-shared';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import UiLabel from './UiLabel.svelte';
	import { uiLabelTextStyles } from './UiLabel.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

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
	const winBookEventAmountTween = new Tween(stateBet.winBookEventAmount);
	const label = $derived(i18nDerived.win());
	const value = $derived(bookEventAmountToCurrencyString(winBookEventAmountTween.current));
	const sharedFontSize = $derived(props.valueFontSize ?? props.labelFontSize ?? 32);
	const valueStyle = {
		...(props.useBalanceValueStyle ? uiLabelTextStyles.balance : uiLabelTextStyles.win),
		fontSize: sharedFontSize,
	} as const;
	const labelStyle = {
		...uiLabelTextStyles.win,
		fontSize: sharedFontSize,
	} as const;

	$effect(() => {
		winBookEventAmountTween.set(stateBet.winBookEventAmount);
	});
</script>

<UiLabel
	tiled
	{label}
	{value}
	assetKey="uiWinBg"
	{labelStyle}
	{valueStyle}
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
	stackedLabelYOffset={props.height ? -props.height * 0.23 : -13}
	stackedValueYOffset={props.height ? props.height * 0.23 : 15}
/>
