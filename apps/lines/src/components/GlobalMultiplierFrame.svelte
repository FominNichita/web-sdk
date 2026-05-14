<script lang="ts" module>
	export type EmitterEventGlobalMultiplierFrame =
		| { type: 'globalMultiplierFrameShow' }
		| { type: 'globalMultiplierFrameHide' }
		| { type: 'globalMultiplierFrameUpdate'; multiplier: number };
</script>

<script lang="ts">
	import { Container, SpineProvider, SpineTrack, SpriteSheet } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { stateBetDerived } from 'state-shared';
	import { waitForResolve } from 'utils-shared/wait';

	import BoardContainer from './BoardContainer.svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';

	type AnimationName = 'static' | 'win' | 'reset' | 'increment';

	const PANEL_WIDTH = SYMBOL_SIZE * 0.641;
	const FRAME_SIZE = SYMBOL_SIZE * 2;
	const context = getContext();
	const scale = $derived(context.stateLayoutDerived.isStacked() ? 1.28 : 1);
	const desktopPosition = $derived({
		x: context.stateGameDerived.boardLayout().width - PANEL_WIDTH * 1.3,
		y: -SYMBOL_SIZE * 0.47,
	});
	const portraitPosition = $derived({
		x: context.stateGameDerived.boardLayout().width - PANEL_WIDTH * 1.5,
		y: -SYMBOL_SIZE * 0.55,
	});
	const position = $derived(
		context.stateLayoutDerived.isStacked() ? portraitPosition : desktopPosition,
	);

	let show = $state(false);
	let animationName = $state<AnimationName>('static');
	let animationKey = $state(0);
	let oncomplete = $state(() => {});

	function restartAnimation() {
		show = true;
		animationKey += 1;
	}

	context.eventEmitter.subscribeOnMount({
		globalMultiplierFrameShow: () => {
			restartAnimation();
		},

		globalMultiplierFrameHide: () => {
			show = false;
		},

		globalMultiplierFrameUpdate: async () => {
			restartAnimation();
			animationName = 'increment';
			await waitForResolve((resolve) => (oncomplete = resolve));
			animationName = 'static';
		},
	});
</script>

<FadeContainer {show}>
	<BoardContainer>
		<Container {...position} {scale}>
			<SpineProvider key="globalMultiplier" width={PANEL_WIDTH}>
				<SpineTrack
					trackIndex={0}
					{animationName}
					timeScale={stateBetDerived.timeScale()}
					listener={{
						complete: () => {
							oncomplete();
						},
					}}
				/>
			</SpineProvider>
			{#key animationKey}
				<SpriteSheet
					anchor={0.5}
					animationSpeed={10 / 60}
					height={FRAME_SIZE}
					key="globalMultiplierFrame"
					loop
					play={show}
					tint={0xfff1a6}
					width={FRAME_SIZE}
				/>
			{/key}
		</Container>
	</BoardContainer>
</FadeContainer>
