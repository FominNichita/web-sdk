<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { stateBetDerived, stateModal } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';
	import { getContextLayout } from 'utils-layout';

	import UiLabel from './UiLabel.svelte';
	import { uiLabelTextStyles } from './UiLabel.svelte';
	import { getContext } from '../context';
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
	};

	const props: Props = $props();
	const context = getContext();
	const { stateLayoutDerived } = getContextLayout();
	const desktop = $derived(stateLayoutDerived.layoutType() === 'desktop');
	const assetKey = $derived(
		desktop ? 'uiRemadeBetAmountBg' : 'uiBetBg',
	);
	const label = $derived(stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet());
	const displayLabel = $derived(desktop ? 'Bet' : label);
	const value = $derived(numberToCurrencyString(stateBetDerived.betCost()));
	const sharedFontSize = $derived(props.valueFontSize ?? props.labelFontSize ?? 32);
	const valueStyle = {
		...(props.useBalanceValueStyle ? uiLabelTextStyles.balance : uiLabelTextStyles.bet),
		...(desktop
			? {
					fill: '#F6E6C8',
					stroke: { color: '#000000', width: 3 },
				}
			: {}),
		fontSize: sharedFontSize,
	} as const;
	const labelStyle = {
		...uiLabelTextStyles.bet,
		fill: desktop ? '#C8C0B6' : uiLabelTextStyles.bet.fill,
		stroke: desktop ? { color: '#000000', width: 3 } : uiLabelTextStyles.bet.stroke,
		fontSize: sharedFontSize,
	} as const;
	const disabled = $derived(!context.stateXstateDerived.isIdle());

	const onpress = () => {
		if (disabled) return;
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'betAmountMenu' };
	};
</script>

<Container eventMode="static" cursor={disabled ? 'not-allowed' : 'pointer'} onpointerup={onpress}>
	<UiLabel
		tiled
		label={displayLabel}
		{value}
		{assetKey}
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
		stacked={props.stacked}
		stackedLabelYOffset={props.height ? -props.height * 0.23 : -13}
		stackedValueYOffset={props.height ? props.height * 0.23 : 15}
	/>
</Container>
