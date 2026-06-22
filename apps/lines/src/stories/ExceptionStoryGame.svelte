<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { stateModal } from 'state-shared';

	import Game from '../components/Game.svelte';

	onMount(() => {
		stateModal.modal = null;
	});

	onDestroy(() => {
		stateModal.modal = null;
	});
</script>

<Game />
