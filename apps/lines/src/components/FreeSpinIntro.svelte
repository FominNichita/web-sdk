<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { BitmapText, Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';

	const context = getContext();

	// Pixi Text in this project does not reliably support fill arrays.
	// Use a solid gold value instead of a gradient array.
	const GOLD_TEXT_FILL = '#FEE17E';

	const WHITE_TEXT_STYLE = {
		fontFamily: 'KleeOne-SemiBold',
		fill: '#ffffff',
		stroke: {
			color: '#343434',
			width: 2,
		},
	} as const;

	let show = $state(false);
	let freeSpinsFromEvent = $state(0);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (emitterEvent) => {
			freeSpinsFromEvent = emitterEvent.totalFreeSpins;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

	<FreeSpinAnimation>
		{#snippet children({ sizes })}
			<Text
				x={0}
				y={sizes.height * -1.1875 + 3}
				anchor={{ x: 0.5, y: 0.5 }}
				text="CONGRATULATIONS!"
				style={{
					fontFamily: 'Sancreek',
					fontSize: sizes.width * 0.1640625,
					fill: '#000000',
					stroke: {
						color: '#000000',
						width: 1,
					},
				}}
			/>

			<Text
				x={0}
				y={sizes.height * -1.1875}
				anchor={{ x: 0.5, y: 0.5 }}
				text="CONGRATULATIONS!"
				style={{
					fontFamily: 'Sancreek',
					fontSize: sizes.width * 0.1640625,
					fill: GOLD_TEXT_FILL,
					stroke: {
						color: '#343434',
						width: 1,
					},
					dropShadow: {
						color: '#F1B63D',
						alpha: 0.55,
						blur: 4,
						distance: 0,
					},
				}}
			/>

			<Text
				x={0}
				y={sizes.height * -0.58 + 3}
				anchor={{ x: 0.5, y: 0.5 }}
				text="YOU WON"
				style={{
					...WHITE_TEXT_STYLE,
					fontSize: sizes.width * 0.135,
					fill: '#000000',
				}}
			/>

			<Text
				x={0}
				y={sizes.height * -0.58}
				anchor={{ x: 0.5, y: 0.5 }}
				text="YOU WON"
				style={{
					...WHITE_TEXT_STYLE,
					fontSize: sizes.width * 0.135,
				}}
			/>

			<BitmapText
				anchor={{ x: 0.5, y: 0.5 }}
				text={freeSpinsFromEvent}
				style={{
					fontFamily: 'gold',
					fontSize: sizes.width * 0.3,
					fontWeight: 'bold',
				}}
			/>

			<Text
				x={0}
				y={sizes.height * 0.65 + 3}
				anchor={{ x: 0.5, y: 0.5 }}
				text="FREE SPINS"
				style={{
					...WHITE_TEXT_STYLE,
					fontSize: sizes.width * 0.135,
					fill: '#000000',
				}}
			/>

			<Text
				x={0}
				y={sizes.height * 0.65}
				anchor={{ x: 0.5, y: 0.5 }}
				text="FREE SPINS"
				style={{
					...WHITE_TEXT_STYLE,
					fontSize: sizes.width * 0.135,
				}}
			/>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
