<script lang="ts">
	import { getContext } from '../game/context';
	import ReelLandingImpact from './ReelLandingImpact.svelte';

	const context = getContext();
	let nextId = 0;
	let impacts = $state<{ id: number; reelIndex: number }[]>([]);

	context.eventEmitter.subscribeOnMount({
		reelLandImpact: ({ reelIndex }) => {
			nextId += 1;
			impacts = [...impacts, { id: nextId, reelIndex }];
		},
	});
</script>

{#each impacts as impact (impact.id)}
	<ReelLandingImpact
		reelIndex={impact.reelIndex}
		oncomplete={() => (impacts = impacts.filter(({ id }) => id !== impact.id))}
	/>
{/each}
