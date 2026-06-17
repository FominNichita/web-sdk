<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Sprite } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UI } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import BackgroundGears from './BackgroundGears.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import GlobalMultiplier from './GlobalMultiplier.svelte';
	import GlobalMultiplierFrame from './GlobalMultiplierFrame.svelte';
	import BoardClock from './BoardClock.svelte';

	const context = getContext();

	const VIDEO_BACKGROUND_URL = new URL(
		'../../assets/video/background_LostTreasure/Animated BG.mp4',
		import.meta.url,
	).href;
	const VIDEO_BACKGROUND_CROSSFADE_SECONDS = 0.45;
	const VIDEO_BACKGROUND_RESET_SECONDS = 0.08;
	const SAN_FONT_URL = new URL('../../assets/fonts/fontFormats/Sancreek-Regular.ttf', import.meta.url)
		.href;
	const AGU_FONT_URL = new URL(
		'../../assets/fonts/fontFormats/AguDisplay-Regular-VariableFont_MORF.ttf',
		import.meta.url,
	).href;
	const KLEE_FONT_URL = new URL('../../assets/fonts/fontFormats/KleeOne-SemiBold.ttf', import.meta.url)
		.href;
	const UI_ASSET_URLS = {
		exitButton: new URL('../../assets/sprites/buttons/Exit.png', import.meta.url).href,
		menuButton: new URL('../../assets/sprites/buttons/menuButtonBG.png', import.meta.url).href,
		activatePanel: new URL('../../assets/sprites/panels/activateBG_panel.png', import.meta.url).href,
		activatePanelHover: new URL('../../assets/sprites/panels/activateBG_panel_HOVER.png', import.meta.url)
			.href,
		activationPanel: new URL('../../assets/sprites/panels/activationBG_panel.png', import.meta.url).href,
		incrementPanel: new URL('../../assets/sprites/panels/incrementBG_panel.png', import.meta.url).href,
		currencyPanel: new URL('../../assets/sprites/panels/currencyBG_panel.png', import.meta.url).href,
		settingsPanel: new URL('../../assets/sprites/panels/panelBG_elonged.png', import.meta.url).href,
		sliderEmpty: new URL('../../assets/sprites/buttons/sliderEmpty.png', import.meta.url).href,
		sliderFilled: new URL('../../assets/sprites/buttons/sliderFilled.png', import.meta.url).href,
	};

	let gameFontsLoaded = $state(false);
	let activeBackgroundVideo = $state(0);
	let backgroundVideoA: HTMLVideoElement;
	let backgroundVideoB: HTMLVideoElement;
	let backgroundLoopFrame = 0;
	let backgroundCrossfadeTimeout = 0;
	let isBackgroundCrossfading = false;

	const getBackgroundVideos = () => [backgroundVideoA, backgroundVideoB].filter(Boolean);

	const playBackgroundVideo = (video: HTMLVideoElement) => {
		const playPromise = video.play();
		if (playPromise) playPromise.catch(() => undefined);
	};

	const monitorBackgroundLoop = () => {
		const videos = getBackgroundVideos();
		const activeVideo = videos[activeBackgroundVideo];

		if (
			activeVideo &&
			Number.isFinite(activeVideo.duration) &&
			activeVideo.duration > VIDEO_BACKGROUND_CROSSFADE_SECONDS
		) {
			const remainingSeconds = activeVideo.duration - activeVideo.currentTime;

			if (!isBackgroundCrossfading && remainingSeconds <= VIDEO_BACKGROUND_CROSSFADE_SECONDS) {
				crossfadeBackgroundVideo();
			}
		}

		backgroundLoopFrame = requestAnimationFrame(monitorBackgroundLoop);
	};

	const crossfadeBackgroundVideo = () => {
		const videos = getBackgroundVideos();
		if (videos.length < 2) return;

		isBackgroundCrossfading = true;
		const previousIndex = activeBackgroundVideo;
		const nextIndex = previousIndex === 0 ? 1 : 0;
		const previousVideo = videos[previousIndex];
		const nextVideo = videos[nextIndex];

		nextVideo.currentTime = VIDEO_BACKGROUND_RESET_SECONDS;
		playBackgroundVideo(nextVideo);
		activeBackgroundVideo = nextIndex;

		backgroundCrossfadeTimeout = window.setTimeout(() => {
			previousVideo.pause();
			previousVideo.currentTime = VIDEO_BACKGROUND_RESET_SECONDS;
			isBackgroundCrossfading = false;
		}, VIDEO_BACKGROUND_CROSSFADE_SECONDS * 1000);
	};

	const startBackgroundLoop = () => {
		const videos = getBackgroundVideos();
		if (videos.length < 2 || videos.some((video) => video.readyState < HTMLMediaElement.HAVE_METADATA)) {
			return;
		}
		if (backgroundLoopFrame) return;

		for (const video of videos) {
			video.currentTime = VIDEO_BACKGROUND_RESET_SECONDS;
		}

		activeBackgroundVideo = 0;
		playBackgroundVideo(videos[0]);
		backgroundLoopFrame = requestAnimationFrame(monitorBackgroundLoop);
	};

	onMount(() => {
		context.stateLayout.showLoadingScreen = true;
	});
	onMount(() => {
		const rootStyle = document.documentElement.style;
		rootStyle.setProperty('--lines-ui-exit-button-url', `url("${UI_ASSET_URLS.exitButton}")`);
		rootStyle.setProperty('--lines-ui-menu-button-url', `url("${UI_ASSET_URLS.menuButton}")`);
		rootStyle.setProperty('--lines-ui-activate-panel-url', `url("${UI_ASSET_URLS.activatePanel}")`);
		rootStyle.setProperty('--lines-ui-activate-panel-hover-url', `url("${UI_ASSET_URLS.activatePanelHover}")`);
		rootStyle.setProperty('--lines-ui-activation-panel-url', `url("${UI_ASSET_URLS.activationPanel}")`);
		rootStyle.setProperty('--lines-ui-increment-panel-url', `url("${UI_ASSET_URLS.incrementPanel}")`);
		rootStyle.setProperty('--lines-ui-currency-panel-url', `url("${UI_ASSET_URLS.currencyPanel}")`);
		rootStyle.setProperty('--lines-ui-settings-panel-url', `url("${UI_ASSET_URLS.settingsPanel}")`);
		rootStyle.setProperty('--lines-ui-slider-empty-url', `url("${UI_ASSET_URLS.sliderEmpty}")`);
		rootStyle.setProperty('--lines-ui-slider-filled-url', `url("${UI_ASSET_URLS.sliderFilled}")`);
	});
	onMount(async () => {
		const sancreekFont = new FontFace('Sancreek', `url("${SAN_FONT_URL}")`);
		const aguFont = new FontFace('AguDisplay', `url("${AGU_FONT_URL}")`);
		const kleeFont = new FontFace('KleeOne-SemiBold', `url("${KLEE_FONT_URL}")`);

		await Promise.all([sancreekFont.load(), aguFont.load(), kleeFont.load()]);
		document.fonts.add(sancreekFont);
		document.fonts.add(aguFont);
		document.fonts.add(kleeFont);
		gameFontsLoaded = true;
	});

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});

	onDestroy(() => {
		if (backgroundLoopFrame) cancelAnimationFrame(backgroundLoopFrame);
		if (backgroundCrossfadeTimeout) clearTimeout(backgroundCrossfadeTimeout);
	});
</script>

<div class="game-root">
	<video
		bind:this={backgroundVideoA}
		class={`video-background ${activeBackgroundVideo === 0 ? 'video-background--active' : ''}`}
		src={VIDEO_BACKGROUND_URL}
		autoplay
		muted
		playsinline
		preload="auto"
		onloadedmetadata={startBackgroundLoop}
	></video>

	<video
		bind:this={backgroundVideoB}
		class={`video-background ${activeBackgroundVideo === 1 ? 'video-background--active' : ''}`}
		src={VIDEO_BACKGROUND_URL}
		muted
		playsinline
		preload="auto"
		onloadedmetadata={startBackgroundLoop}
	></video>

	<BackgroundGears />

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
					{#if gameFontsLoaded}
						<BoardClock />
					{/if}
				</MainContainer>

				<MainContainer>
					<Board />
					<Anticipations />
				</MainContainer>

				{#if gameFontsLoaded}
					<UI>
						{#snippet gameName()}
						{/snippet}
						{#snippet logo()}
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
		opacity: 0;
		pointer-events: none;
		transition: opacity 450ms linear;
	}

	.video-background--active {
		opacity: 1;
	}

	.pixi-layer {
		position: absolute;
		inset: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
	}
</style>
