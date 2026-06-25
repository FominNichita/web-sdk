<script lang="ts">
	import { BlurFilter } from 'pixi.js';
	import { Container } from 'pixi-svelte';

	import ReelSymbol from './ReelSymbol.svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	const spinBlurFilters = context.stateGame.board.map(
		() => new BlurFilter({ strengthX: 0.8, strengthY: 5, quality: 1 }),
	);
</script>

{#each context.stateGame.board as reel, reelIndex (reelIndex)}
	<Container filters={reel.reelState.motion !== 'stopped' ? [spinBlurFilters[reelIndex]] : []}>
		{#each reel.reelState.symbols as reelSymbol}
			<ReelSymbol {reelIndex} {reelSymbol} />
		{/each}
	</Container>
{/each}
