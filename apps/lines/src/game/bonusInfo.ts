import config from './config';
import { BASE_FREE_SPINS, RETRIGGER_FREE_SPINS, WILD_MULTIPLIERS } from './paytable';

export type BonusSpinAward = {
	symbolCount: number;
	awardedSpins: number;
};

export type BonusInfoEntry = {
	id: string;
	backendModeName?: keyof typeof config.betModes;
	title: string;
	summary: string;
	description: readonly string[];
	enabled: boolean;
	published: boolean;
	frontendImplemented: boolean;
	mathImplemented: boolean;
	purchase?: {
		costMultiplier: number;
	};
	rtpPercent: number;
	maxWinMultiplier: number;
	triggerTable: readonly BonusSpinAward[];
	retriggerTable?: readonly BonusSpinAward[];
	multiplierWild?: {
		values: readonly number[];
		combinationMethod: 'additive';
	};
	rtpNote?: string;
	rules: readonly string[];
};

const triggerTable = BASE_FREE_SPINS.map(({ scatters, spins }) => ({
	symbolCount: scatters,
	awardedSpins: spins,
}));

const retriggerTable = RETRIGGER_FREE_SPINS.map(({ scatters, spins }) => ({
	symbolCount: scatters,
	awardedSpins: spins,
}));

// Verified against math-sdk-globalmult/games/0_0_lines and its published index/statistics.
export const BONUS_INFO_ENTRIES: readonly BonusInfoEntry[] = [
	{
		id: 'bonus-buy',
		backendModeName: 'bonus',
		title: 'TRIGGER FREE SPIN',
		summary: 'Purchase guaranteed direct entry into Free Spins for 100× your selected bet.',
		description: [
			'Purchasing this option starts a bonus round that guarantees entry into Free Spins. The generated triggering spin lands 3, 4, or 5 Scatter symbols and awards 8, 12, or 15 Free Spins respectively.',
			'During Free Spins, Wild symbols may carry 2×, 3×, 4×, 5×, 10×, 20×, or 50× multipliers. A multiplier applies only to a winning line containing that Wild. If several multiplier Wilds take part in the same winning line, their values are added together.',
			'During Free Spins, landing 2, 3, 4, or 5 Scatter symbols awards 3, 5, 8, or 12 additional Free Spins. The additional spins are added to the remaining total.',
		],
		enabled: true,
		published: true,
		frontendImplemented: true,
		mathImplemented: true,
		purchase: {
			costMultiplier: 100,
		},
		rtpPercent: 96.5,
		maxWinMultiplier: 5000,
		triggerTable,
		retriggerTable,
		multiplierWild: {
			values: WILD_MULTIPLIERS,
			combinationMethod: 'additive',
		},
		rtpNote:
			'RTP is a theoretical long-term average and does not predict the result of an individual Bonus purchase.',
		rules: [
			'The purchase price scales with the selected base bet and starts the Free Spins feature directly.',
			'The 100× purchase price does not become the selected base bet.',
			'Scatter symbols trigger Free Spins but do not have a normal line payout.',
			'Multiple winning lines are calculated individually and then added together.',
			'Individual multiplier Wilds during Free Spins are the feature multiplier mechanic.',
		],
	},
];

export const VISIBLE_BONUS_INFO_ENTRIES = BONUS_INFO_ENTRIES.filter(
	(entry) =>
		entry.enabled &&
		entry.published &&
		entry.frontendImplemented &&
		entry.mathImplemented,
);

if (import.meta.env.DEV) {
	for (const entry of VISIBLE_BONUS_INFO_ENTRIES) {
		if (!entry.backendModeName || !entry.purchase) continue;

		const mode = config.betModes[entry.backendModeName];
		if (
			mode.cost !== entry.purchase.costMultiplier ||
			mode.rtp * 100 !== entry.rtpPercent ||
			mode.max_win !== entry.maxWinMultiplier ||
			!mode.buyBonus
		) {
			throw new Error(`Bonus information for "${entry.id}" does not match the frontend math config.`);
		}
	}
}
