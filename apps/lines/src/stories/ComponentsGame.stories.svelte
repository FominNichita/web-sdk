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
	import type { Position, RawSymbol } from '../game/types';

	setContext();

	const setLandingSymbol = ({
		reel,
		row,
		rawSymbol,
	}: Position & { rawSymbol: RawSymbol }) => {
		const reelSymbol = stateGame.board[reel].reelState.symbols[row];
		reelSymbol.rawSymbol = rawSymbol;
		reelSymbol.symbolState = 'land';
	};
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

<Story
	name="desktop labels: win hidden"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			stateBet.balanceAmount = 10_000_000;
			stateBet.winBookEventAmount = 0;
		},
	})}
	{template}
/>

<Story
	name="desktop labels: trigger win"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { winAmount: 5_000_000 },
		action: async ({ winAmount }) => {
			stateBet.balanceAmount = 10_000_000;
			stateBet.winBookEventAmount = 0;
			await new Promise((resolve) => setTimeout(resolve, 250));
			stateBet.winBookEventAmount = winAmount;
		},
	})}
	{template}
/>

<Story
	name="autospin counter: one digit"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { counter: 8 },
		action: async ({ counter }) => {
			stateBet.balanceAmount = 10_000;
			stateBet.autoSpinsCounter = counter;
		},
	})}
	{template}
/>

<Story
	name="autospin counter: two digits"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { counter: 25 },
		action: async ({ counter }) => {
			stateBet.balanceAmount = 10_000;
			stateBet.autoSpinsCounter = counter;
		},
	})}
	{template}
/>

<Story
	name="autospin counter: three digits"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { counter: 100 },
		action: async ({ counter }) => {
			stateBet.balanceAmount = 10_000;
			stateBet.autoSpinsCounter = counter;
		},
	})}
	{template}
/>

<Story
	name="autospin counter: infinity"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { counter: Infinity },
		action: async ({ counter }) => {
			stateBet.balanceAmount = 10_000;
			stateBet.autoSpinsCounter = counter;
		},
	})}
	{template}
/>

<Story
	name="visual effects/spin button arrow"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			stateBet.balanceAmount = 10_000;
			stateBet.betAmount = 1;
			stateBet.wageredBetAmount = 1;
			stateBet.activeBetModeKey = 'BASE';
			stateBet.autoSpinsCounter = 0;
			eventEmitter.broadcast({ type: 'hotKey', key: 'Space', action: 'keyDown' } as never);
			await new Promise((resolve) => setTimeout(resolve, 520));
			eventEmitter.broadcast({ type: 'hotKey', key: 'Space', action: 'keyUp' } as never);
		},
	})}
	{template}
/>

<Story
	name="visual effects/scatter landing"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { reel: 2, row: 2 },
		action: async ({ reel, row }) => {
			stateBet.isTurbo = false;
			stateGame.scatterCounter = 2;
			eventEmitter.broadcast({ type: 'screenShake', intensity: 1.22 });
			setLandingSymbol({
				reel,
				row,
				rawSymbol: { name: 'S', scatter: true },
			});
		},
	})}
	{template}
/>

<Story
	name="visual effects/multiplier Wild reveal"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { reel: 2, row: 2, multiplier: 10 },
		action: async ({ reel, row, multiplier }) => {
			stateBet.isTurbo = false;
			setLandingSymbol({
				reel,
				row,
				rawSymbol: { name: 'W', wild: true, multiplier },
			});
		},
	})}
	{template}
/>

<Story
	name="visual effects/reel stop"
	args={templateArgs({
		skipLoadingScreen: true,
		data: { reelIndex: 2 },
		action: async ({ reelIndex }) => {
			stateBet.isTurbo = false;
			eventEmitter.broadcast({
				type: 'reelLandImpact',
				reelIndex,
				symbols: [
					{ name: 'L1' },
					{ name: 'H1' },
					{ name: 'W', multiplier: 5, wild: true },
					{ name: 'L4' },
					{ name: 'H3' },
				],
			});
		},
	})}
	{template}
/>

<Story
	name="visual effects/payline"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {
			lineIndex: 8,
			positions: [
				{ reel: 0, row: 2 },
				{ reel: 1, row: 1 },
				{ reel: 2, row: 2 },
				{ reel: 3, row: 3 },
				{ reel: 4, row: 2 },
			] as Position[],
		},
		action: async ({ lineIndex, positions }) => {
			stateBet.isTurbo = false;
			await eventEmitter.broadcastAsync({
				type: 'boardWithAnimateSymbols',
				symbolPositions: positions,
				winningLinePositions: positions,
				winningLineIndex: lineIndex,
			});
		},
	})}
	{template}
/>

<Story
	name="visual effects/Free Spin embers"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			stateGame.gameType = 'freegame';
			await new Promise((resolve) => setTimeout(resolve, 540));
			eventEmitter.broadcast({ type: 'freeSpinWinVisualPulse' });
		},
	})}
	{template}
/>

<Story
	name="visual effects/frame shine"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			stateBet.isTurbo = false;
			stateGame.gameType = 'basegame';
			eventEmitter.broadcast({ type: 'boardFrameWinShine' });
		},
	})}
	{template}
/>
