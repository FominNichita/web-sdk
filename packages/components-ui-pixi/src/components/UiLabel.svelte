<script lang="ts" module>
	import type { TextProps } from 'pixi-svelte';

	const GOLD_TEXT_FILL = '#F1B63D';

	export const uiLabelTextStyles = {
		balance: {
			fontFamily: 'Sancreek',
			fill: GOLD_TEXT_FILL,
			stroke: { color: '#000000', width: 4 },
		},
		win: {
			fontFamily: 'Sancreek',
			fontSize: 28,
			fill: '#000000',
			stroke: { color: GOLD_TEXT_FILL, width: 4 },
		},
		bet: {
			fontFamily: 'Sancreek',
			fill: '#000000',
			stroke: { color: GOLD_TEXT_FILL, width: 4 },
		},
	} satisfies Record<string, TextProps['style']>;
</script>

<script lang="ts">
	import { Container, Text, type SpriteProps, type TextProps } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = {
		label: string;
		value: string;
		assetKey?: SpriteProps['key'];
		labelStyle?: TextProps['style'];
		valueStyle?: TextProps['style'];
		width?: number;
		height?: number;
		tiled?: boolean;
		stacked?: boolean;
		stackedLabelYOffset?: number;
		stackedValueYOffset?: number;
		labelFontSize?: number;
		valueFontSize?: number;
		horizontalPadding?: number;
		verticalPadding?: number;
		minimumTextScale?: number;
	};

	const props: Props = $props();
	const panelWidth = $derived(props.width ?? 320);
	const panelHeight = $derived(props.height ?? 88);
	const horizontalPadding = $derived(props.horizontalPadding ?? 18);
	const verticalPadding = $derived(props.verticalPadding ?? 12);
	const minimumTextScale = $derived(props.minimumTextScale ?? 0.6);
	const innerWidth = $derived(panelWidth - horizontalPadding * 2);
	const innerHeight = $derived(panelHeight - verticalPadding * 2);
	const hasLabel = $derived(Boolean(props.label));
	const textAreaHeight = $derived(hasLabel ? innerHeight * 0.46 : innerHeight);
	let labelTextWidth = $state(0);
	let labelTextHeight = $state(0);
	let valueTextWidth = $state(0);
	let valueTextHeight = $state(0);
	const stackedLabelYOffset = $derived(props.stackedLabelYOffset ?? -panelHeight * 0.18);
	const stackedValueYOffset = $derived(props.stackedValueYOffset ?? panelHeight * 0.18);
	const labelScale = $derived.by(() => {
		if (!labelTextWidth || !labelTextHeight) return 1;

		return Math.max(
			minimumTextScale,
			Math.min(1, innerWidth / labelTextWidth, textAreaHeight / labelTextHeight),
		);
	});
	const valueScale = $derived.by(() => {
		if (!valueTextWidth || !valueTextHeight) return 1;

		return Math.max(
			minimumTextScale,
			Math.min(1, innerWidth / valueTextWidth, textAreaHeight / valueTextHeight),
		);
	});

	const labelStyle = {
		fontFamily: 'proxima-nova',
		fontSize: props.labelFontSize ?? UI_BASE_FONT_SIZE * 0.62,
		fill: WHITE,
		...props.labelStyle,
	} as const;

	const valueStyle = {
		fontFamily: 'proxima-nova',
		fontSize: props.valueFontSize ?? UI_BASE_FONT_SIZE * 0.76,
		fill: WHITE,
		...props.valueStyle,
	} as const;
</script>

{#if props.stacked}
	{#if props.tiled}
		<UiSprite
			anchor={0.5}
			assetKey={props.assetKey}
			width={panelWidth}
			height={panelHeight}
			borderRadius={20}
		/>
	{/if}
	<Container y={stackedLabelYOffset} scale={labelScale}>
		<Text
			anchor={0.5}
			text={props.label}
			style={labelStyle}
			onresize={({ width, height }) => {
				labelTextWidth = width;
				labelTextHeight = height;
			}}
		/>
	</Container>
	<Container y={stackedValueYOffset} scale={valueScale}>
		<Text
			anchor={0.5}
			text={props.value}
			style={valueStyle}
			onresize={({ width, height }) => {
				valueTextWidth = width;
				valueTextHeight = height;
			}}
		/>
	</Container>
{:else}
	{#if props.tiled}
		<UiSprite
			anchor={0.5}
			assetKey={props.assetKey}
			width={panelWidth}
			height={panelHeight}
			borderRadius={20}
		/>
	{/if}
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label} style={labelStyle} x={-panelWidth * 0.43} />
	<Container x={panelWidth * 0.18} scale={valueScale}>
		<Text
			anchor={{ x: 0, y: 0.5 }}
			text={props.value}
			style={valueStyle}
			onresize={({ width, height }) => {
				valueTextWidth = width;
				valueTextHeight = height;
			}}
		/>
	</Container>
{/if}
