<script lang="ts">
	import { Tween } from 'svelte/motion';

	import { stateBet } from 'state-shared';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { getContextLayout } from 'utils-layout';

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
		inlineTextGap?: number;
		useBalanceValueStyle?: boolean;
		labelAnchorX?: number;
		valueAnchorX?: number;
		showBackground?: boolean;
	};

	const props: Props = $props();
	const { stateLayoutDerived } = getContextLayout();
	const desktop = $derived(stateLayoutDerived.layoutType() === 'desktop');
	const winBookEventAmountTween = new Tween(stateBet.winBookEventAmount);
	const label = $derived(desktop ? 'Win' : i18nDerived.win());
	const value = $derived(bookEventAmountToCurrencyString(winBookEventAmountTween.current));
	const show = $derived(!desktop || winBookEventAmountTween.current > 0);
	const valueStyle = $derived({
		...(desktop || props.useBalanceValueStyle ? uiLabelTextStyles.balance : uiLabelTextStyles.win),
		...(desktop ? { fill: '#F6E6C8' } : {}),
		fontSize: props.valueFontSize ?? 38,
	});
	const labelStyle = $derived({
		...(desktop ? uiLabelTextStyles.balance : uiLabelTextStyles.win),
		...(desktop
			? {
					fill: '#C8C0B6',
					stroke: { color: '#000000', width: 3 },
				}
			: {}),
		fontSize: props.labelFontSize ?? 26,
	});

	$effect(() => {
		winBookEventAmountTween.set(stateBet.winBookEventAmount);
	});
</script>

{#if show}
	<UiLabel
		tiled={props.showBackground ?? true}
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
		dynamicInlineSpacing
		inlineTextGap={props.inlineTextGap}
		labelAnchorX={props.labelAnchorX}
		valueAnchorX={props.valueAnchorX}
		stacked={props.stacked}
		stackedLabelYOffset={props.height ? -props.height * 0.23 : -13}
		stackedValueYOffset={props.height ? props.height * 0.23 : 15}
	/>
{/if}
