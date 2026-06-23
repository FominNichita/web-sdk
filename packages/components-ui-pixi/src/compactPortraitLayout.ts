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

	/**
	 * Increasing row.y moves the complete row downward.
	 * Decreasing row.y moves the complete row upward.
	 * Increasing gap separates the buttons; decreasing it moves them closer.
	 */
	greenControlRow: {
		centerX: 540,
		y: 1240,
		gap: 34,
	},
	autoSpin: {
		width: 277.4,
		height: 114,
		offsetY: 0,
	},
	betAction: {
		width: 312.8,
		height: 138,
		offsetY: 0,
	},
	turbo: {
		width: 265.2,
		height: 117,
		offsetY: 0,
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
		balanceValueSize: 58,
		menuSize: 26,
		buyBonusSize: 26,
		minimumScale: 0.72,
	},

	/**
	 * Panel font sizes are source Pixi font sizes in the 1080 x 1920 design
	 * space. All three information panels share the same portrait parent scale,
	 * so matching source sizes produces matching final visible sizes.
	 *
	 * Increasing offsetY moves text downward; decreasing it moves text upward.
	 * Increasing a preferred source font size enlarges the normal value.
	 * minimumSourceFontSize controls the preferred lower fitting limit.
	 * Increasing padding reduces usable text space; decreasing it moves text
	 * closer to the decorative frame.
	 */
	winPanelText: {
		headingSourceFontSize: 42,
		valuePreferredSourceFontSize: 58,
		valueMinimumSourceFontSize: 40,
		headingOffsetX: -88,
		headingOffsetY: 0,
		valueOffsetX: 48,
		valueOffsetY: 0,
		headingMaxWidth: 320,
		valueMaxWidth: 320,
		paddingLeft: 42,
		paddingRight: 42,
		paddingTop: 12,
		paddingBottom: 12,
		headingMaxHeight: 68,
		valueMaxHeight: 76,
	},
	selectedBetPanelText: {
		headingSourceFontSize: 42,
		valuePreferredSourceFontSize: 58,
		valueMinimumSourceFontSize: 40,
		headingOffsetX: -88,
		headingOffsetY: 0,
		valueOffsetX: 48,
		valueOffsetY: 0,
		headingMaxWidth: 320,
		valueMaxWidth: 320,
		paddingLeft: 42,
		paddingRight: 42,
		paddingTop: 12,
		paddingBottom: 12,
		headingMaxHeight: 68,
		valueMaxHeight: 76,
	},

	/**
	 * Text offsets are anchor-relative Pixi logical coordinates.
	 * Increasing offsetY moves a label downward; decreasing it moves it upward.
	 */
	autoSpinText: {
		fontSize: 30,
		lineHeight: 27,
		offsetX: 0,
		offsetY: 1,
		horizontalPadding: 24,
		verticalPadding: 10,
	},
	betActionText: {
		fontSize: 38,
		offsetX: 0,
		offsetY: 1,
		horizontalPadding: 25,
		verticalPadding: 12,
	},
	turboText: {
		fontSize: 30,
		offsetX: 0,
		offsetY: 1,
		horizontalPadding: 23,
		verticalPadding: 11,
	},

	textPadding: {
		balancePanelHorizontal: 42,
		balancePanelVertical: 18,
		buttonHorizontalRatio: 0.18,
		buttonVerticalRatio: 0.18,
	},
} as const;
