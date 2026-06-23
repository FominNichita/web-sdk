<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	import { Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { PORTRAIT_BOARD_OFFSET_X, PORTRAIT_BOARD_SCALE } from '../game/constants';

	const context = getContext();
	const FRAME_SCALE = { width: 1.15, height: 1.2 };
	const FRAME_OFFSET = { x: 8, y: -8 };
	const CLOCK_TOP_PADDING = 24;
	const CLOCK_OPTICAL_OFFSET_X = -5;
	const CLOCK_OPTICAL_OFFSET_Y = 4;

	const reactiveDate = new SvelteDate();
	const boardScale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_SCALE : 1,
	);
	const boardOffsetX = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_OFFSET_X : 0,
	);
	const clock = $derived(
		reactiveDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		}),
	);
	const frameHeight = $derived(
		context.stateGameDerived.boardLayout().height * FRAME_SCALE.height * boardScale,
	);
	const clockPosition = $derived({
		x:
			context.stateGameDerived.boardLayout().x +
			boardOffsetX +
			(FRAME_OFFSET.x + CLOCK_OPTICAL_OFFSET_X) * boardScale,
		y:
			context.stateGameDerived.boardLayout().y +
			FRAME_OFFSET.y * boardScale -
			frameHeight * 0.5 +
			(CLOCK_TOP_PADDING + CLOCK_OPTICAL_OFFSET_Y) * boardScale,
	});
	const clockStyle = {
	fontFamily: 'AguDisplay',
	fontSize: 34,
	fontWeight: '700',
	fill: '#FEE17E',
	stroke: {
		color: '#1A0900',
		width: 0.6,
	},
	
} as const;

	$effect(() => {
		const interval = setInterval(() => {
			reactiveDate.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Text anchor={0.5} text={clock} x={clockPosition.x} y={clockPosition.y} style={clockStyle} />
