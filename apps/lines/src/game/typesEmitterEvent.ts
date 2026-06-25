import type { EmitterEventBoard } from '../components/Board.svelte';
import type { EmitterEventBoardFrame } from '../components/BoardFrame.svelte';
import type { EmitterEventFreeSpinIntro } from '../components/FreeSpinIntro.svelte';
import type { EmitterEventFreeSpinCounter } from '../components/FreeSpinCounter.svelte';
import type { EmitterEventFreeSpinOutro } from '../components/FreeSpinOutro.svelte';
import type { EmitterEventWin } from '../components/Win.svelte';
import type { EmitterEventSound } from '../components/Sound.svelte';
import type { EmitterEventTransition } from '../components/Transition.svelte';
import type { EmitterEventGlobalMultiplier } from '../components/GlobalMultiplier.svelte';
import type { EmitterEventGlobalMultiplierFrame } from '../components/GlobalMultiplierFrame.svelte';
import type { RawSymbol } from './types';

export type EmitterEventGame =
	| { type: 'screenShake'; intensity?: number }
	| { type: 'reelLandImpact'; reelIndex: number; symbols: RawSymbol[] }
	| { type: 'freeSpinWinVisualPulse' }
	| { type: 'backgroundWinWarmth'; intensity: number }
	| EmitterEventBoard
	| EmitterEventBoardFrame
	| EmitterEventWin
	| EmitterEventFreeSpinIntro
	| EmitterEventFreeSpinCounter
	| EmitterEventFreeSpinOutro
	| EmitterEventSound
	| EmitterEventTransition
	| EmitterEventGlobalMultiplier
	| EmitterEventGlobalMultiplierFrame;
