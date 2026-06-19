import { DEFAULT_BET_MODE_META, DEFAULT_GAME_RULE_META } from './constants';

export type BetModeData = {
	maxWin?: number;
	mode: string;
	costMultiplier: number;
	type: 'default' | 'activate' | 'buy';
	parent: string;
	children: string;
	assets: {
		icon: string;
		volatility: string;
		button: string;
		dialogImage: string;
		dialogVolatility: string;
	};
	text: {
		bannerText?: string;
		description?: string;
		betAmountLabel?: string;
		title: string;
		dialog: string;
		button: string;
		tickerIdle: string;
		tickerSpin: string;
	};
};

export type BetModeMeta = Record<string, BetModeData>;

export type GameRuleContainer = {
	title: string;
	text: string;
	textImages?: { [key: string]: string };
	image: string;
	row: number;
	column: number;
	imagePosition: 'top' | 'left';
};

export type GameRuleData = {
	containers: GameRuleContainer[];
	rows: number;
	columns: number;
	title: string;
};

type GameRuleMeta = {
	gameRules: GameRuleData[];
	payTable: GameRuleData[];
	splashScreen: GameRuleData[];
};

export const stateMeta = $state({
	betModeMeta: DEFAULT_BET_MODE_META as BetModeMeta,
	gameRuleMeta: DEFAULT_GAME_RULE_META as GameRuleMeta,
	publishedBetModeKeys: null as string[] | null,
});

export const stateMetaDerived = {
	betModeMetaList: () => Object.values(stateMeta.betModeMeta),
	publishedBetModeMetaList: () => {
		const list = Object.values(stateMeta.betModeMeta);
		if (!stateMeta.publishedBetModeKeys) return list;

		const publishedKeys = new Set(stateMeta.publishedBetModeKeys.map((key) => key.toUpperCase()));
		return list.filter((item) => publishedKeys.has(item.mode.toUpperCase()));
	},
};
