<script lang="ts">
	import { getContext } from '../game/context';
	import type { RawSymbol } from '../game/types';
	import ReelLandingImpact from './ReelLandingImpact.svelte';

	const context = getContext();
	let nextId = 0;
	let impacts = $state<{ id: number; reelIndex: number; symbols: RawSymbol[] }[]>([]);

	context.eventEmitter.subscribeOnMount({
		reelLandImpact: ({ reelIndex, symbols }) => {
			nextId += 1;
			impacts = [...impacts, { id: nextId, reelIndex, symbols }];
		},
	});
</script>

{#each impacts as impact (impact.id)}
	<ReelLandingImpact
		reelIndex={impact.reelIndex}
		symbols={impact.symbols}
		oncomplete={() => (impacts = impacts.filter(({ id }) => id !== impact.id))}
	/>
{/each}
