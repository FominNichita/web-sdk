<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/<Game>',
	});
</script>

<script lang="ts">
	import {
		StoryLocale,
		StoryGameTemplate,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';

	import { stateGame, stateGameDerived } from '../game/stateGame.svelte';
	import { stateBet } from 'state-shared';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { eventEmitter } from '../game/eventEmitter';
	import config from '../game/config';

	setContext();
</script>

{#snippet template(args: TemplateArgs<any>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			await args.action?.(args.data);
		}}
	>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<Story name="component (loadingScreen)">
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>

<Story
	name="preSpin"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			await stateGameDerived.enhancedBoard.preSpin({
				paddingBoard: config.paddingReels[stateGame.gameType],
			});
		},
	})}
	{template}
/>

<Story
	name="emitterEvent: boardHide"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			eventEmitter.broadcast({ type: 'boardHide' });
		},
	})}
	{template}
/>

<Story
	name="emitterEvent: globalMultiplierFrameUpdate"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { multiplier: 3 },
		action: async (data) => {
			eventEmitter.broadcast({ type: 'globalMultiplierFrameShow' });
			await eventEmitter.broadcastAsync({
				type: 'globalMultiplierFrameUpdate',
				multiplier: data.multiplier,
			});
		},
	})}
	{template}
/>

<Story
	name="desktop labels: maximum values"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			stateBet.balanceAmount = 10_000_000;
			stateBet.betAmount = 1000;
			stateBet.wageredBetAmount = 1000;
			stateBet.activeBetModeKey = 'BONUS';
			stateBet.winBookEventAmount = 500_000;
		},
	})}
	{template}
/>
