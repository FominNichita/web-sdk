<script lang="ts" module>
	export type EmitterEventFreeSpinCounter =
		| { type: 'freeSpinCounterShow' }
		| { type: 'freeSpinCounterHide' }
		| { type: 'freeSpinCounterUpdate'; current?: number; total?: number };
</script>

<script lang="ts">
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';

	import { getContext } from '../game/context';
	import {
		PORTRAIT_BOARD_OFFSET_X,
		PORTRAIT_BOARD_SCALE,
		SYMBOL_SIZE,
	} from '../game/constants';
	import { Container, Sprite, Text } from 'pixi-svelte';

	const context = getContext();
	const panelWidth = $derived(SYMBOL_SIZE * 2.55);
	const panelHeight = $derived(SYMBOL_SIZE * 2.45);
	const panelSizes = $derived({
		width: panelWidth,
		height: panelHeight,
	});
	const textLayoutHeight = $derived(panelWidth / (1524 / 996));
	const titleY = $derived(-textLayoutHeight * 0.09);
	const numberY = $derived(textLayoutHeight * 0.145);
	const ofY = $derived(textLayoutHeight * 0.16);
	const scale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? 1.25 : 1,
	);
	const position = $derived.by(() => {
		const boardLayout = context.stateGameDerived.boardLayout();
		const portrait = context.stateLayoutDerived.layoutType() === 'portrait';

		if (portrait) {
			return {
				x:
					boardLayout.x +
					PORTRAIT_BOARD_OFFSET_X -
					panelSizes.width * scale * 0.5,
				y:
					boardLayout.y -
					boardLayout.height * PORTRAIT_BOARD_SCALE * 0.5 -
					panelSizes.height * scale -
					SYMBOL_SIZE * 0.5,
			};
		}

		return {
			x: boardLayout.x - boardLayout.width * 0.5 - panelSizes.width - SYMBOL_SIZE * 0.7 +70,
			y: boardLayout.y - boardLayout.height * 0.5,
		};
	});

	const titleStyle = $derived({
		fontFamily: 'Sancreek',
		fontSize: panelSizes.width * 0.118,
		fontWeight: '700',
		fill: '#050301',
		letterSpacing: 1,
	});
	const numberStyle = $derived({
		fontFamily: 'Sancreek',
		fontSize: panelSizes.width * 0.155,
		fontWeight: '700',
		fill: '#050301',
	});
	const ofStyle = $derived({
		fontFamily: 'Sancreek',
		fontSize: panelSizes.width * 0.068,
		fontWeight: '700',
		fill: '#050301',
	});

	let show = $state(false);
	let current = $state(0);
	let total = $state(0);

	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (show = true),
		freeSpinCounterHide: () => (show = false),
		freeSpinCounterUpdate: (emitterEvent) => {
			if (emitterEvent.current !== undefined) current = emitterEvent.current;
			if (emitterEvent.total !== undefined) total = emitterEvent.total;
		},
	});
</script>

<MainContainer>
	<FadeContainer {show} {...position} {scale}>
		<Sprite key="uiRemadeFreeSpinCounterBg" {...panelSizes} />

		<Container x={panelSizes.width * 0.5} y={panelSizes.height * 0.5 - textLayoutHeight * 0.01}>
			<Text
				anchor={0.5}
				y={titleY}
				text="FREE SPIN"
				style={titleStyle}
			/>

			<Text
				anchor={0.5}
				x={-panelSizes.width * 0.145}
				y={numberY}
				text={`${current}`}
				style={numberStyle}
			/>

			<Text
				anchor={0.5}
				x={0}
				y={ofY}
				text="OF"
				style={ofStyle}
			/>

			<Text
				anchor={0.5}
				x={panelSizes.width * 0.145}
				y={numberY}
				text={`${total}`}
				style={numberStyle}
			/>
		</Container>
	</FadeContainer>
</MainContainer>
