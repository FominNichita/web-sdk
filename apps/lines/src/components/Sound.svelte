<script lang="ts" module>
	import {
		isSound2Name,
		sound,
		sound2,
		type MusicName,
		type SoundEffectName,
		type SoundName,
	} from '../game/sound';

	export type EmitterEventSound =
		| { type: 'soundMusic'; name: MusicName }
		| { type: 'soundOnce'; name: SoundEffectName; forcePlay?: boolean }
		| { type: 'soundLoop'; name: SoundEffectName }
		| { type: 'soundStop'; name: SoundName }
		| { type: 'soundFade'; name: SoundName; from: number; to: number; duration: number }
		| { type: 'soundScatterCounterIncrease' }
		| { type: 'soundScatterCounterClear' };
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { waitForTimeout } from 'utils-shared/wait';
	import { SECOND } from 'constants-shared/time';
	import { stateBet } from 'state-shared';

	import { getContext } from '../game/context';

	const context = getContext();
	const playOnce = (name: SoundEffectName, forcePlay?: boolean) => {
		if (isSound2Name(name)) {
			sound2.players.once.play({ name, forcePlay });
			return;
		}
		sound.players.once.play({ name, forcePlay });
	};
	const playLoop = (name: SoundEffectName) => {
		if (isSound2Name(name)) {
			sound2.players.loop.play({ name });
			return;
		}
		sound.players.loop.play({ name });
	};
	const stop = (name: SoundName) => {
		if (isSound2Name(name)) {
			sound2.stop({ name });
			return;
		}
		sound.stop({ name });
	};
	const fade = async (name: SoundName, from: number, to: number, duration: number) => {
		if (isSound2Name(name)) {
			await sound2.fade({ name, from, to, duration });
			return;
		}
		await sound.fade({ name, from, to, duration });
	};

	context.eventEmitter.subscribeOnMount({
		// ui
		soundBetMode: async ({ betModeKey }) => {
			if (betModeKey === 'SUPERSPIN') {
				// check if SUPERSPIN, when changing the bet mode.
				sound.players.once.play({ name: 'sfx_winlevel_end' });
				await waitForTimeout(SECOND);
				sound.players.music.play({ name: 'bgm_freespin' });
			} else {
				sound.players.music.play({ name: 'bgm_main' });
			}
		},
		soundPressGeneral: () => sound.players.once.play({ name: 'sfx_btn_general' }),
		soundPressBet: () => sound.players.once.play({ name: 'sfx_btn_spin' }),
		// scatterCounter
		soundScatterCounterIncrease: () => (context.stateGame.scatterCounter = context.stateGame.scatterCounter + 1), // prettier-ignore
		soundScatterCounterClear: () => (context.stateGame.scatterCounter = 0),
		// game
		soundMusic: ({ name }) => sound.players.music.play({ name }),
		soundLoop: ({ name }) => playLoop(name),
		soundOnce: ({ name, forcePlay }) => playOnce(name, forcePlay),
		soundStop: ({ name }) => stop(name),
		soundFade: async ({ name, duration, from, to }) => await fade(name, from, to, duration), // prettier-ignore
	});

	onMount(() => {
		if (stateBet.activeBetModeKey === 'SUPERSPIN') {
			// check if SUPERSPIN, when resume bet and the bet is a super spin.
			sound.players.music.play({ name: 'bgm_freespin' });
		} else {
			sound.players.music.play({ name: 'bgm_main' });

			//How to control volume per soundfile(use fade)
			// sound.players.music.fade({ name: 'bgm_main', from: 0, to: 1, duration: 2000 });

			//How to control rate per soundfile
			// sound.players.music.rate({ rate: 2, name: 'bgm_main'}); // change play back rate(1: default, 0: slow, 1+ fasterm and higher pitch )
		}
	});
</script>
