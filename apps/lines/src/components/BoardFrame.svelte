<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' }
		| { type: 'boardFrameWinShine' };
</script>

<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { Sprite, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { getContext } from '../game/context';
	import { PORTRAIT_BOARD_OFFSET_X, PORTRAIT_BOARD_SCALE } from '../game/constants';

	const context = getContext();
	const FRAME_SCALE = { width: 1.15, height: 1.25 };
	const FRAME_OFFSET = { x: 8, y: -8 };
	const GLOW_SCALE = { width: 0.57, height: 0.69 };

	type AnimationName = 'reelhouse_glow_start' | 'reelhouse_glow_idle' | 'reelhouse_glow_exit';

	let animationName = $state<AnimationName | undefined>(undefined);
	let loop = $state(false);
	const winShine = new Tween(0);
	let winShineRunId = 0;
	const boardScale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_SCALE : 1,
	);
	const boardOffsetX = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_OFFSET_X : 0,
	);
	const frameWidth = $derived(
		context.stateGameDerived.boardLayout().width * FRAME_SCALE.width * boardScale,
	);
	const frameHeight = $derived(
		context.stateGameDerived.boardLayout().height * FRAME_SCALE.height * boardScale,
	);
	const glowWidth = $derived(
		context.stateGameDerived.boardLayout().width * GLOW_SCALE.width * boardScale,
	);
	const glowHeight = $derived(
		context.stateGameDerived.boardLayout().height * GLOW_SCALE.height * boardScale,
	);
	const frameOffset = $derived({
		x: FRAME_OFFSET.x * boardScale,
		y: FRAME_OFFSET.y * boardScale,
	});

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {
			animationName = 'reelhouse_glow_start';
			loop = false;
		},
		boardFrameGlowHide: () => {
			if (animationName) animationName = 'reelhouse_glow_exit';
		},
		boardFrameWinShine: () => {
			if (stateBet.isTurbo || animationName) return;
			winShineRunId += 1;
			const runId = winShineRunId;

			void (async () => {
				await winShine.set(0, { duration: 0 });
				await winShine.set(1, { duration: 620, easing: cubicInOut });
				if (runId !== winShineRunId) return;
				await winShine.set(0, { duration: 0 });
			})();
		},
	});

</script>

{#if animationName}
	<SpineProvider
		zIndex={-1}
		key="reelhouse"
		x={context.stateGameDerived.boardLayout().x + boardOffsetX + frameOffset.x}
		y={context.stateGameDerived.boardLayout().y + frameOffset.y}
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
	x={context.stateGameDerived.boardLayout().x + boardOffsetX + frameOffset.x}
	y={context.stateGameDerived.boardLayout().y + frameOffset.y}
	width={frameWidth}
	height={frameHeight}
/>

<Sprite
	key="frame_edge.png"
	anchor={0.5}
	x={context.stateGameDerived.boardLayout().x + boardOffsetX + frameOffset.x}
	y={context.stateGameDerived.boardLayout().y + frameOffset.y}
	width={frameWidth}
	height={frameHeight}
/>

{#if winShine.current > 0}
	<Sprite
		key="frame_edge.png"
		anchor={0.5}
		x={context.stateGameDerived.boardLayout().x + boardOffsetX + frameOffset.x}
		y={context.stateGameDerived.boardLayout().y + frameOffset.y}
		width={frameWidth}
		height={frameHeight}
		tint={0xffc247}
		alpha={Math.sin(winShine.current * Math.PI) * 0.24}
	/>
{/if}
