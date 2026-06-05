<script lang="ts">
	import { stateSound, stateUi } from 'state-shared';
	import { Container, Rectangle, Text } from 'pixi-svelte';

	import UiSprite from './UiSprite.svelte';

	const PANEL_WIDTH = 620;
	const PANEL_HEIGHT = 165;
	const TITLE_Y = -132;
	const ROW_START_Y = -52;
	const ROW_GAP = 42;
	const LABEL_X = -250;
	const SLIDER_X = 30;
	const VALUE_X = 250;
	const SLIDER_WIDTH = 220;
	const SLIDER_HEIGHT = 13;
	const HIT_HEIGHT = 34;
	const CLOSE_SIZE = 34;
	const CLOSE_X = PANEL_WIDTH * 0.5 - 18;
	const CLOSE_Y = -PANEL_HEIGHT * 0.5 - 92;
	const TEXT_COLOR = '#989898';

	const titleStyle = {
		fontFamily: 'Sancreek',
		fontSize: 74,
		fill: '#D4A744',
		stroke: { color: '#000000', width: 4 },
	};

	const rowTextStyle = {
		fontFamily: 'Sancreek',
		fontSize: 20,
		fill: TEXT_COLOR,
	};

	const valueTextStyle = {
		fontFamily: 'Sancreek',
		fontSize: 20,
		fill: TEXT_COLOR,
		align: 'right',
	};

	const closeStyle = {
		fontFamily: 'Sancreek',
		fontSize: 24,
		fill: TEXT_COLOR,
		stroke: { color: '#000000', width: 2 },
	};

	const rows = [
		{
			label: 'Master Volume',
			get value() {
				return stateSound.volumeValueMaster;
			},
			setValue: (value: number) => (stateSound.volumeValueMaster = value),
		},
		{
			label: 'Music Volume',
			get value() {
				return stateSound.volumeValueMusic;
			},
			setValue: (value: number) => (stateSound.volumeValueMusic = value),
		},
		{
			label: 'Sound Effect Volume',
			get value() {
				return stateSound.volumeValueSoundEffect;
			},
			setValue: (value: number) => (stateSound.volumeValueSoundEffect = value),
		},
	];

	let draggingRow = $state<number | null>(null);

	const clampVolume = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

	const getLocalX = (event: unknown) => {
		const pointerEvent = event as {
			getLocalPosition?: (target: unknown) => { x: number };
			currentTarget?: unknown;
			global?: { x: number };
		};

		if (pointerEvent.getLocalPosition && pointerEvent.currentTarget) {
			return pointerEvent.getLocalPosition(pointerEvent.currentTarget).x;
		}

		return pointerEvent.global?.x ?? 0;
	};

	const setValueFromPointer = (index: number, event: unknown) => {
		const localX = getLocalX(event);
		const value = clampVolume((localX / SLIDER_WIDTH) * 100);
		rows[index].setValue(value);
	};

	const close = () => {
		stateUi.soundPanelOpen = false;
	};
</script>

<Container>
	<Text anchor={0.5} y={TITLE_Y} text="SOUND" style={titleStyle} />

	<UiSprite assetKey="uiSoundPanelBg" anchor={0.5} width={PANEL_WIDTH} height={PANEL_HEIGHT} />

	<Container
		x={CLOSE_X}
		y={CLOSE_Y}
		eventMode="static"
		cursor="pointer"
		onpointerup={close}
	>
		<Rectangle
			anchor={0.5}
			width={CLOSE_SIZE}
			height={CLOSE_SIZE}
			backgroundColor={0x000000}
			backgroundAlpha={0.3}
			borderColor={0x989898}
			borderWidth={1}
		/>
		<Text anchor={0.5} text="X" style={closeStyle} />
	</Container>

	{#each rows as row, index}
		{@const rowY = ROW_START_Y + ROW_GAP * index}
		<Text x={LABEL_X} y={rowY} anchor={{ x: 0, y: 0.5 }} text={row.label} style={rowTextStyle} />

		<Container x={SLIDER_X - SLIDER_WIDTH * 0.5} y={rowY}>
			<UiSprite
				assetKey="uiSoundSliderEmpty"
				y={0}
				anchor={{ x: 0, y: 0.5 }}
				width={SLIDER_WIDTH}
				height={SLIDER_HEIGHT}
			/>
			<UiSprite
				assetKey="uiSoundSliderFilled"
				y={0}
				anchor={{ x: 0, y: 0.5 }}
				width={SLIDER_WIDTH * (row.value / 100)}
				height={SLIDER_HEIGHT}
			/>
			<Rectangle
				eventMode="static"
				cursor="pointer"
				y={0}
				anchor={{ x: 0, y: 0.5 }}
				width={SLIDER_WIDTH}
				height={HIT_HEIGHT}
				backgroundColor={0x000000}
				backgroundAlpha={0.001}
				onpointerdown={(event) => {
					draggingRow = index;
					setValueFromPointer(index, event);
				}}
				onpointermove={(event) => {
					if (draggingRow === index) {
						setValueFromPointer(index, event);
					}
				}}
				onpointerup={(event) => {
					setValueFromPointer(index, event);
					draggingRow = null;
				}}
				onpointerupoutside={() => {
					draggingRow = null;
				}}
			/>
		</Container>

		<Text
			x={VALUE_X}
			y={rowY}
			anchor={{ x: 1, y: 0.5 }}
			text={row.value.toString()}
			style={valueTextStyle}
		/>
	{/each}
</Container>
