/**
 * Compact portrait HUD tuning.
 *
 * Positions and dimensions use Pixi logical coordinates in the portrait
 * 1080 x 1920 design space. x increases toward the right and y increases
 * toward the bottom. Every listed position is the center anchor of the item.
 * Scale values are multipliers applied to the button's native sprite size.
 */
export const compactPortraitLayout = {
	maxViewportWidth: 480,
	minimumControlHitSize: 132,

	menu: {
		x: 160,
		y: 110,
		scale: 2.05,
	},
	buyBonus: {
		x: 900,
		y: 110,
		scale: 1.75,
	},

	betAction: {
		x: 540,
		y: 1240,
		scale: 2.3,
	},
	autoSpin: {
		x: 350,
		y: 1385,
		scale: 1.9,
	},
	turbo: {
		x: 730,
		y: 1385,
		scale: 1.95,
	},

	winPanel: {
		x: 290,
		y: 1545,
		width: 470,
		height: 126,
	},
	balancePanel: {
		x: 790,
		y: 1545,
		width: 470,
		height: 126,
	},

	selectedBetPanel: {
		x: 540,
		y: 1730,
		width: 420,
		height: 118,
	},
	minusButton: {
		x: 150,
		y: 1730,
		scale: 2.05,
	},
	plusButton: {
		x: 930,
		y: 1730,
		scale: 2.05,
	},

	text: {
		winLabelSize: 42,
		winValueSize: 58,
		balanceValueSize: 58,
		betDisplayLabelSize: 40,
		betDisplayValueSize: 52,
		betActionSize: 38,
		menuSize: 26,
		buyBonusSize: 26,
		autoSpinSize: 30,
		turboSize: 30,
		minimumScale: 0.72,
	},

	textPadding: {
		infoPanelHorizontal: 42,
		infoPanelVertical: 18,
		betPanelHorizontal: 44,
		betPanelVertical: 16,
		buttonHorizontalRatio: 0.18,
		buttonVerticalRatio: 0.18,
	},
} as const;
