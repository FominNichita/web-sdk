<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Sprite } from 'pixi-svelte';
	import { stateMeta, stateModal } from 'state-shared';

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
	import BoardClock from './BoardClock.svelte';
	import PaytableContent from './PaytableContent.svelte';
	import gameConfig from '../game/config';

	const context = getContext();
	stateMeta.publishedBetModeKeys = Object.keys(gameConfig.betModes);

	$effect(() => {
		const bonusKey = Object.keys(stateMeta.betModeMeta).find(
			(key) => key.toUpperCase() === 'BONUS',
		);
		if (!bonusKey) return;

		const bonusMode = stateMeta.betModeMeta[bonusKey];
		const title = 'TRIGGER FREE SPIN';
		const description =
			'Purchase guaranteed direct entry into Free Spins for 100× your selected bet.';
		const dialog =
			'Starts the Free Spins feature directly. The triggering spin awards 8, 12, or 15 Free Spins from 3, 4, or 5 Scatters. During Free Spins, participating multiplier Wilds add their values on each winning line, and Scatter symbols can award additional spins.';

		if (
			bonusMode.text.title === title &&
			bonusMode.text.description === description &&
			bonusMode.text.dialog === dialog
		) {
			return;
		}

		bonusMode.text = {
			...bonusMode.text,
			title,
			description,
			dialog,
		};
	});

	const VIDEO_BACKGROUND_URL = new URL(
		'../../assets/video/background_LostTreasure/Animated BG.mp4',
		import.meta.url,
	).href;
	const VIDEO_BACKGROUND_CROSSFADE_SECONDS = 0.45;
	const VIDEO_BACKGROUND_RESET_SECONDS = 0.08;
	const SAN_FONT_URL = new URL(
		'../../assets/fonts/fontFormats/Sancreek-Regular.ttf',
		import.meta.url,
	).href;
	const AGU_FONT_URL = new URL(
		'../../assets/fonts/fontFormats/AguDisplay-Regular-VariableFont_MORF.ttf',
		import.meta.url,
	).href;
	const KLEE_FONT_URL = new URL(
		'../../assets/fonts/fontFormats/KleeOne-SemiBold.ttf',
		import.meta.url,
	).href;
	const UI_ASSET_URLS = {
		exitButton: new URL('../../assets/sprites/buttons/Exit.png', import.meta.url).href,
		menuButton: new URL('../../assets/sprites/buttons/menuButtonBG.png', import.meta.url).href,
		activatePanel: new URL('../../assets/sprites/panels/activateBG_panel.png', import.meta.url)
			.href,
		activatePanelHover: new URL(
			'../../assets/sprites/panels/activateBG_panel_HOVER.png',
			import.meta.url,
		).href,
		activationPanel: new URL('../../assets/sprites/panels/activationBG_panel.png', import.meta.url)
			.href,
		incrementPanel: new URL('../../assets/sprites/panels/incrementBG_panel.png', import.meta.url)
			.href,
		currencyPanel: new URL('../../assets/sprites/panels/currencyBG_panel.png', import.meta.url)
			.href,
		settingsPanel: new URL('../../assets/sprites/panels/panelBG_elonged.png', import.meta.url).href,
		sliderEmpty: new URL('../../assets/sprites/buttons/sliderEmpty.png', import.meta.url).href,
		sliderFilled: new URL('../../assets/sprites/buttons/sliderFilled.png', import.meta.url).href,
	};

	let gameFontsLoaded = $state(false);
	let backgroundBackdrop: HTMLCanvasElement;
	let backgroundPoster: HTMLCanvasElement;
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

	const updateBackgroundBackdrop = (video: HTMLVideoElement) => {
		if (!backgroundBackdrop || !video.videoWidth || !video.videoHeight) return;

		const maxBackdropWidth = 960;
		const scale = Math.min(1, maxBackdropWidth / video.videoWidth);
		const width = Math.round(video.videoWidth * scale);
		const height = Math.round(video.videoHeight * scale);

		for (const canvas of [backgroundBackdrop, backgroundPoster]) {
			if (!canvas) continue;
			canvas.width = width;
			canvas.height = height;
			canvas.getContext('2d', { alpha: false })?.drawImage(video, 0, 0, width, height);
		}
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
		if (
			videos.length < 2 ||
			videos.some((video) => video.readyState < HTMLMediaElement.HAVE_METADATA)
		) {
			return;
		}
		if (backgroundLoopFrame) return;

		for (const video of videos) {
			video.currentTime = VIDEO_BACKGROUND_RESET_SECONDS;
		}

		activeBackgroundVideo = 0;
		playBackgroundVideo(videos[0]);
		updateBackgroundBackdrop(videos[0]);
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
		rootStyle.setProperty(
			'--lines-ui-activate-panel-hover-url',
			`url("${UI_ASSET_URLS.activatePanelHover}")`,
		);
		rootStyle.setProperty(
			'--lines-ui-activation-panel-url',
			`url("${UI_ASSET_URLS.activationPanel}")`,
		);
		rootStyle.setProperty(
			'--lines-ui-increment-panel-url',
			`url("${UI_ASSET_URLS.incrementPanel}")`,
		);
		rootStyle.setProperty('--lines-ui-currency-panel-url', `url("${UI_ASSET_URLS.currencyPanel}")`);
		rootStyle.setProperty('--lines-ui-settings-panel-url', `url("${UI_ASSET_URLS.settingsPanel}")`);
		rootStyle.setProperty('--lines-ui-slider-empty-url', `url("${UI_ASSET_URLS.sliderEmpty}")`);
		rootStyle.setProperty('--lines-ui-slider-filled-url', `url("${UI_ASSET_URLS.sliderFilled}")`);
	});
	onMount(async () => {
		const sancreekFont = new FontFace('Sancreek', `url("${SAN_FONT_URL}")`);
		const aguFont = new FontFace('AguDisplay', `url("${AGU_FONT_URL}")`);
		const kleeFont = new FontFace('KleeOne-SemiBold', `url("${KLEE_FONT_URL}")`);
		const modalSancreekFont = new FontFace('LinesModalSancreek', `url("${SAN_FONT_URL}")`);
		const modalKleeFont = new FontFace('LinesModalKlee', `url("${KLEE_FONT_URL}")`);

		await Promise.all([
			sancreekFont.load(),
			aguFont.load(),
			kleeFont.load(),
			modalSancreekFont.load(),
			modalKleeFont.load(),
		]);
		document.fonts.add(sancreekFont);
		document.fonts.add(aguFont);
		document.fonts.add(kleeFont);
		document.fonts.add(modalSancreekFont);
		document.fonts.add(modalKleeFont);
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
	<canvas bind:this={backgroundBackdrop} class="background-extension" aria-hidden="true"></canvas>
	<div class="background-extension-shade" aria-hidden="true"></div>
	<canvas bind:this={backgroundPoster} class="background-poster" aria-hidden="true"></canvas>

	<video
		bind:this={backgroundVideoA}
		class={`video-background ${activeBackgroundVideo === 0 ? 'video-background--active' : ''}`}
		src={VIDEO_BACKGROUND_URL}
		autoplay
		muted
		playsinline
		preload="auto"
		onloadedmetadata={startBackgroundLoop}
		onloadeddata={() => updateBackgroundBackdrop(backgroundVideoA)}
	></video>

	<video
		bind:this={backgroundVideoB}
		class={`video-background ${activeBackgroundVideo === 1 ? 'video-background--active' : ''}`}
		src={VIDEO_BACKGROUND_URL}
		muted
		playsinline
		preload="auto"
		onloadedmetadata={startBackgroundLoop}
		onloadeddata={() => {
			if (!backgroundVideoA?.videoWidth) updateBackgroundBackdrop(backgroundVideoB);
		}}
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
						{#snippet gameName()}{/snippet}
						{#snippet logo()}{/snippet}
						{#snippet footerBar({ width, height })}
							<Sprite key="uiFooterBarBg" anchor={0.5} {width} {height} />
						{/snippet}
					</UI>
				{/if}

				<Win />
				<FreeSpinIntro />

				{#if ['desktop', 'landscape', 'portrait'].includes(
					context.stateLayoutDerived.layoutType(),
				)}
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
	{#snippet payTable()}
		<PaytableContent initialTab="paytable" />
	{/snippet}
	{#snippet gameRules()}
		<PaytableContent initialTab="features" />
	{/snippet}
</Modals>

<style>
	.game-root {
		position: relative;
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		overflow: hidden;
		background: #130d09;
		isolation: isolate;
	}

	.background-extension,
	.background-extension-shade,
	.background-poster {
		position: absolute;
		inset: -2rem;
		width: calc(100% + 4rem);
		height: calc(100% + 4rem);
		pointer-events: none;
		opacity: 0;
	}

	.background-extension {
		z-index: 0;
		object-fit: cover;
		filter: blur(18px) saturate(0.88) brightness(0.72);
		transform: scale(1.08);
	}

	.background-extension-shade {
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(8, 5, 3, 0.5) 0%,
			rgba(15, 9, 5, 0.18) 28%,
			rgba(15, 9, 5, 0.2) 68%,
			rgba(5, 3, 2, 0.62) 100%
		);
	}

	.background-poster {
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		object-fit: contain;
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

		z-index: 2;
		opacity: 0;
		pointer-events: none;
		transition: opacity 450ms linear;
	}

	.video-background--active {
		opacity: 1;
	}

	@media (orientation: portrait) {
		.video-background {
			object-fit: cover;
			object-position: center center;
		}

		.background-extension {
			opacity: 0;
		}

		.background-extension-shade {
			opacity: 0.35;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.video-background {
			display: none;
		}

		.background-poster {
			opacity: 1;
		}

		.background-extension {
			opacity: 0.82;
		}

		.background-extension-shade {
			opacity: 1;
		}
	}

	.pixi-layer {
		position: absolute;
		inset: 0;
		z-index: 4;
		width: 100%;
		height: 100%;
	}
</style>
