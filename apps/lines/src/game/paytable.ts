import type { SymbolName } from './types';

export type PaytableSymbol = {
	id: Exclude<SymbolName, 'S' | 'H5'>;
	name: string;
	image: string;
	payouts: readonly [number, number, number];
};

export type FeatureSymbol = {
	id: 'S';
	name: string;
	image: string;
};

export type Payline = readonly [number, number, number, number, number];

const SYMBOL_IMAGES = {
	W: new URL('../../assets/sprites/symbolsStatic/Symbols/CheryBoom.png', import.meta.url).href,
	S: new URL('../../assets/sprites/symbolsStatic/Symbols/FreeSpinSymbol.png', import.meta.url).href,
	H1: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure1.png', import.meta.url).href,
	H2: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure3.png', import.meta.url).href,
	H3: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure2.png', import.meta.url).href,
	H4: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure4.png', import.meta.url).href,
	L1: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol3.png', import.meta.url).href,
	L2: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol1.png', import.meta.url).href,
	L3: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol4.png', import.meta.url).href,
	L4: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol2.png', import.meta.url).href,
	L5: new URL('../../assets/sprites/symbolsStatic/Symbols/Ring.png', import.meta.url).href,
} as const;

// Verified against math-sdk-globalmult/games/0_0_lines/game_config.py on 2026-06-18.
export const PAYTABLE_SYMBOLS: readonly PaytableSymbol[] = [
	{ id: 'W', name: 'Cherry Wild', image: SYMBOL_IMAGES.W, payouts: [50, 20, 10] },
	{ id: 'H1', name: 'Orange Dragon Stone', image: SYMBOL_IMAGES.H1, payouts: [50, 20, 10] },
	{ id: 'H2', name: 'Blue Dragon Stone', image: SYMBOL_IMAGES.H2, payouts: [15, 5, 3] },
	{ id: 'H3', name: 'Green Dragon Stone', image: SYMBOL_IMAGES.H3, payouts: [10, 3, 2] },
	{ id: 'H4', name: 'Purple Dragon Stone', image: SYMBOL_IMAGES.H4, payouts: [8, 2, 1] },
	{ id: 'L1', name: 'Heart', image: SYMBOL_IMAGES.L1, payouts: [5, 1, 0.5] },
	{ id: 'L2', name: 'Spade', image: SYMBOL_IMAGES.L2, payouts: [3, 0.7, 0.3] },
	{ id: 'L3', name: 'Club', image: SYMBOL_IMAGES.L3, payouts: [3, 0.7, 0.3] },
	{ id: 'L4', name: 'Diamond', image: SYMBOL_IMAGES.L4, payouts: [2, 0.5, 0.2] },
	{ id: 'L5', name: 'Dragon Ring', image: SYMBOL_IMAGES.L5, payouts: [1, 0.3, 0.1] },
];

export const SCATTER_SYMBOL: FeatureSymbol = {
	id: 'S',
	name: 'Green Eye Scatter',
	image: SYMBOL_IMAGES.S,
};

export const BASE_FREE_SPINS = [
	{ scatters: 3, spins: 8 },
	{ scatters: 4, spins: 12 },
	{ scatters: 5, spins: 15 },
] as const;

export const RETRIGGER_FREE_SPINS = [
	{ scatters: 2, spins: 3 },
	{ scatters: 3, spins: 5 },
	{ scatters: 4, spins: 8 },
	{ scatters: 5, spins: 12 },
] as const;

export const WILD_MULTIPLIERS = [2, 3, 4, 5, 10, 20, 50] as const;

export const PAYLINES: readonly Payline[] = [
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[2, 2, 2, 2, 2],
	[0, 1, 2, 1, 0],
	[2, 1, 0, 1, 2],
	[0, 0, 1, 2, 2],
	[2, 2, 1, 0, 0],
	[1, 0, 1, 2, 1],
	[1, 2, 1, 0, 1],
	[0, 1, 1, 1, 2],
	[2, 1, 1, 1, 0],
	[0, 1, 0, 1, 2],
	[2, 1, 2, 1, 0],
	[1, 1, 0, 1, 1],
	[1, 1, 2, 1, 1],
	[0, 2, 1, 0, 2],
	[2, 0, 1, 2, 0],
	[0, 0, 2, 0, 0],
	[2, 2, 0, 2, 2],
	[1, 0, 0, 0, 1],
];

export const GAME_FACTS = {
	reels: 5,
	rows: 3,
	paylines: 20,
	rtp: 97,
	maxWin: 5000,
	baseCost: 1,
	bonusCost: 100,
} as const;
