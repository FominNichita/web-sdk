<script lang="ts">
	import { onMount } from 'svelte';

	import type { LoadedAudio } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { sound, sound2, type SoundEffectName, type SoundName } from '../game/sound';

	const context = getContext();

	onMount(() => {
		const loadedAudio = $state.snapshot(
			context.stateApp.loadedAssets['sound'],
		) as LoadedAudio<SoundName>;
		const loadedAudio2 = $state.snapshot(
			context.stateApp.loadedAssets['sound2'],
		) as LoadedAudio<SoundEffectName>;
		const primarySound = sound.load(loadedAudio);
		const secondarySound = sound2.load(loadedAudio2);

		return () => {
			// Equivalent to onDestroy(); Leave this comment for searching.
			primarySound.destroy();
			secondarySound.destroy();
		};
	});

	sound.enableEffect();
	sound.volumeEffect();
	sound2.enableEffect();
	sound2.volumeEffect();
</script>
