<script lang="ts">
	import { Tween } from 'svelte/motion';

	import { stateBet } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';

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
	};

	const props: Props = $props();
	const balanceTween = new Tween(stateBet.balanceAmount);
	const value = $derived(numberToCurrencyString(balanceTween.current));
	const balanceValueStyle = {
		...uiLabelTextStyles.balance,
		fontSize: props.valueFontSize ?? 38,
	} as const;

	$effect(() => {
		balanceTween.set(stateBet.balanceAmount);
	});
</script>

<UiLabel
	tiled
	label=""
	{value}
	assetKey="uiBalanceBg"
	labelStyle={uiLabelTextStyles.balance}
	valueStyle={balanceValueStyle}
	width={props.width}
	height={props.height}
	labelFontSize={props.labelFontSize}
	valueFontSize={props.valueFontSize}
	horizontalPadding={props.horizontalPadding}
	verticalPadding={props.verticalPadding}
	minimumTextScale={props.minimumTextScale}
	stacked={props.stacked}
	stackedValueYOffset={0}
/>
