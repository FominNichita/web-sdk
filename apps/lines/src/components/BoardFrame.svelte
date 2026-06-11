<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { Sprite, SpineProvider, SpineTrack } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const context = getContext();
	const FRAME_SCALE = { width: 1.15, height: 1.25 };
	const FRAME_OFFSET = { x: 8, y: -8 };
	const GLOW_SCALE = { width: 0.57, height: 0.69 };
	const GLOW_OFFSET = FRAME_OFFSET;

	type AnimationName = 'reelhouse_glow_start' | 'reelhouse_glow_idle' | 'reelhouse_glow_exit';

	let animationName = $state<AnimationName | undefined>(undefined);
	let loop = $state(false);
	const frameWidth = $derived(context.stateGameDerived.boardLayout().width * FRAME_SCALE.width);
	const frameHeight = $derived(context.stateGameDerived.boardLayout().height * FRAME_SCALE.height);
	const glowWidth = $derived(context.stateGameDerived.boardLayout().width * GLOW_SCALE.width);
	const glowHeight = $derived(context.stateGameDerived.boardLayout().height * GLOW_SCALE.height);

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {
			animationName = 'reelhouse_glow_start';
			loop = false;
		},
		boardFrameGlowHide: () => {
			if (animationName) animationName = 'reelhouse_glow_exit';
		},
	});
</script>

{#if animationName}
	<SpineProvider
		zIndex={-1}
		key="reelhouse"
		x={context.stateGameDerived.boardLayout().x + GLOW_OFFSET.x}
		y={context.stateGameDerived.boardLayout().y + GLOW_OFFSET.y}
		width={glowWidth}
		height={glowHeight}
	>
		<SpineTrack
			trackIndex={0}
			{animationName}
			{loop}
			listener={{
				complete: (entry) => {
					if (entry.animation) {
						if (entry.animation.name === 'reelhouse_glow_start') {
							animationName = 'reelhouse_glow_idle';
							loop = true;
						}

						if (entry.animation.name === 'reelhouse_glow_exit') {
							animationName = undefined;
							loop = false;
						}
					}
				},
			}}
		/>
	</SpineProvider>
{/if}

<Sprite
	key="frame_bg.png"
	anchor={0.5}
	x={context.stateGameDerived.boardLayout().x + FRAME_OFFSET.x}
	y={context.stateGameDerived.boardLayout().y + FRAME_OFFSET.y}
	width={frameWidth}
	height={frameHeight}
/>

<Sprite
	key="frame_edge.png"
	anchor={0.5}
	x={context.stateGameDerived.boardLayout().x + FRAME_OFFSET.x}
	y={context.stateGameDerived.boardLayout().y + FRAME_OFFSET.y}
	width={frameWidth}
	height={frameHeight}
/>
