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
	};

	const props: Props = $props();
	const panelWidth = $derived(props.width ?? 320);
	const panelHeight = $derived(props.height ?? 88);
	const valueMaxWidth = $derived(panelWidth - 36);
	const valueMaxHeight = $derived(panelHeight * 0.34);
	let valueTextWidth = $state(0);
	let valueTextHeight = $state(0);
	const stackedLabelYOffset = $derived(props.stackedLabelYOffset ?? -panelHeight * 0.18);
	const stackedValueYOffset = $derived(props.stackedValueYOffset ?? panelHeight * 0.18);
	const valueScale = $derived.by(() => {
		if (!valueTextWidth || !valueTextHeight) return 1;

		return Math.min(1, valueMaxWidth / valueTextWidth, valueMaxHeight / valueTextHeight);
	});

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
	<Text anchor={0.5} text={props.label} style={labelStyle} y={stackedLabelYOffset} />
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
