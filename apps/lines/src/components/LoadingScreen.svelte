<script lang="ts">
	import { Container, Sprite, SpriteSheet } from 'pixi-svelte';
	import { FadeContainer, LoadingProgress } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { sound2 } from '../game/sound';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';

	type Props = {
		onloaded: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let loadingType = $state<'start' | 'transition'>('start');

	const PROGRESS_BAR_WIDTH = 390;
	const PROGRESS_BAR_HEIGHT = PROGRESS_BAR_WIDTH * (86 / 600);
	const PROGRESS_BAR_FILL_PADDING_X = PROGRESS_BAR_WIDTH * (12 / 600);
	const PROGRESS_BAR_FILL_PADDING_Y = PROGRESS_BAR_HEIGHT * (12 / 86);

	const continueToGame = () => {
		sound2.players.once.play({ name: 'sfx_intro' });
		loadingType = 'transition';
	};
</script>

<!-- logo and loading progress -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<Container
			x={context.stateLayoutDerived.mainLayout().width * 0.5}
			y={context.stateLayoutDerived.mainLayout().height * 0.5}
		>
			<SpriteSheet
				anchor={0.5}
				animationSpeed={24 / 60}
				key="loadingLogo"
				loop
				play={loadingType === 'start'}
				width={375}
				height={375}
			/>
			{#if !context.stateApp.loaded}
				<LoadingProgress y={250} width={PROGRESS_BAR_WIDTH} height={PROGRESS_BAR_HEIGHT}>
					{#snippet background(sizes)}
						<Sprite key="loadingProgressBackground" {...sizes} />
					{/snippet}
					{#snippet progress(sizes)}
						<Sprite
							key="loadingProgressFill"
							x={PROGRESS_BAR_FILL_PADDING_X}
							y={PROGRESS_BAR_FILL_PADDING_Y}
							width={sizes.width - PROGRESS_BAR_FILL_PADDING_X * 2}
							height={sizes.height - PROGRESS_BAR_FILL_PADDING_Y * 2}
						/>
					{/snippet}
					{#snippet frame(sizes)}
					{/snippet}
				</LoadingProgress>
			{/if}
		</Container>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	<PressToContinue onpress={continueToGame} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
