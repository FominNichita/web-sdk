<script lang="ts" module>
	import { FillGradient } from 'pixi.js';
	import type { TextProps } from 'pixi-svelte';

	const GOLD_GRADIENT_STOPS = [
		{ offset: 0, color: '#E18D28' },
		{ offset: 0.31, color: '#FEE17E' },
		{ offset: 0.66, color: '#F1B63D' },
		{ offset: 1, color: '#7B4D16' },
	];
	const createVerticalGoldGradient = () =>
		new FillGradient({
			start: { x: 0, y: 0 },
			end: { x: 0, y: 1 },
			colorStops: GOLD_GRADIENT_STOPS,
		});

	export const uiLabelTextStyles = {
		balance: {
			fontFamily: 'Sancreek',
			fill: createVerticalGoldGradient(),
			stroke: { color: '#000000', width: 4 },
		},
		win: {
			fontFamily: 'Sancreek',
			fill: '#000000',
			stroke: { fill: createVerticalGoldGradient(), width: 4 },
		},
		bet: {
			fontFamily: 'Sancreek',
			fill: '#000000',
			stroke: { fill: createVerticalGoldGradient(), width: 4 },
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
	};

	const props: Props = $props();
	const panelWidth = $derived(props.width ?? 320);
	const panelHeight = $derived(props.height ?? 88);
	const valueMaxWidth = $derived(panelWidth - 48);
	let valueTextWidth = $state(0);
	const valueScale = $derived(valueTextWidth > 0 ? Math.min(1, valueMaxWidth / valueTextWidth) : 1);

	const labelStyle = {
		fontFamily: 'proxima-nova',
		fontSize: UI_BASE_FONT_SIZE * 0.62,
		fill: WHITE,
		...props.labelStyle,
	} as const;

	const valueStyle = {
		fontFamily: 'proxima-nova',
		fontSize: UI_BASE_FONT_SIZE * 0.76,
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
	<Text anchor={0.5} text={props.label} style={labelStyle} y={-panelHeight * 0.18} />
	<Container y={panelHeight * 0.18} scale={valueScale}>
		<Text
			anchor={0.5}
			text={props.value}
			style={valueStyle}
			onresize={({ width }) => (valueTextWidth = width)}
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
			onresize={({ width }) => (valueTextWidth = width)}
		/>
	</Container>
{/if}
