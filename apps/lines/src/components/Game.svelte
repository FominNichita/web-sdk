<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Sprite, Text, REM } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import I18nTest from './I18nTest.svelte';
	import GlobalMultiplier from './GlobalMultiplier.svelte';
	import GlobalMultiplierFrame from './GlobalMultiplierFrame.svelte';

	const context = getContext();

	const VIDEO_BACKGROUND_URL = '/assets/video/background_LostTreasure/Animated%20BG.mp4';
	const SAN_FONT_URL = '/assets/fonts/fontFormats/Sancreek-Regular.ttf';

	let sancreekFontLoaded = $state(false);

	onMount(() => (context.stateLayout.showLoadingScreen = true));
	onMount(async () => {
		const sancreekFont = new FontFace('Sancreek', `url("${SAN_FONT_URL}")`);

		await sancreekFont.load();
		document.fonts.add(sancreekFont);
		sancreekFontLoaded = true;
	});

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});
</script>

<div class="game-root">
	<video
		class="video-background"
		src={VIDEO_BACKGROUND_URL}
		autoplay
		muted
		loop
		playsinline
		preload="auto"
	></video>

	<div class="pixi-layer">
		<App>
			<EnableSound />
			<EnableHotkey />
			<EnableGameActor />
			<EnablePixiExtension />

			<Background />

			{#if context.stateLayout.showLoadingScreen}
				<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
			{:else}
				<ResumeBet />

				<!--
					The reason why <Sound /> is rendered after clicking the loading screen:
					"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
					Ref: https://developer.chrome.com/blog/autoplay
				-->
				<Sound />

				<MainContainer>
					<BoardFrame />
				</MainContainer>

				<MainContainer>
					<Board />
					<Anticipations />
				</MainContainer>

				{#if sancreekFontLoaded}
					<UI>
						{#snippet gameName()}
							<UiGameName name="LINES GAME" />
						{/snippet}
						{#snippet logo()}
							<Text
								anchor={{ x: 1, y: 0 }}
								text="ADD YOUR LOGO"
								style={{
									fontFamily: 'proxima-nova',
									fontSize: REM * 1.5,
									fontWeight: '600',
									lineHeight: REM * 2,
									fill: 0xffffff,
								}}
							/>
						{/snippet}
						{#snippet footerBar({ width, height })}
							<Sprite key="uiFooterBarBg" anchor={0.5} {width} {height} />
						{/snippet}
					</UI>
				{/if}

				<Win />
				<GlobalMultiplier />
				<GlobalMultiplierFrame />
				<FreeSpinIntro />

				{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
					<FreeSpinCounter />
				{/if}

				<FreeSpinOutro />
				<Transition />

				<I18nTest />
			{/if}
		</App>
	</div>
</div>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>

<style>
	.game-root {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: black;
		isolation: isolate;
	}

	.video-background {
		position: absolute;
		inset: 0;

		width: 100%;
		height: 100%;

		/*
			cover = fills screen but crops/zooms
			contain = shows full video but may create black bars
			fill = no crop, but may stretch
		*/
		object-fit: contain;

		z-index: 0;
		pointer-events: none;
	}

	.pixi-layer {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
</style>
