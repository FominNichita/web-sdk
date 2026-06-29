export default {
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url)
			.href,
		preload: true,
	},
	loadingLogo: {
		type: 'spriteSheet',
		src: [
			new URL('../../assets/video/LogoAttlas/sequence_600_0.json', import.meta.url).href,
			new URL('../../assets/video/LogoAttlas/sequence_600_1.json', import.meta.url).href,
			new URL('../../assets/video/LogoAttlas/sequence_600_2.json', import.meta.url).href,
			new URL('../../assets/video/LogoAttlas/sequence_600_3.json', import.meta.url).href,
		],
		preload: true,
	},
	H1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h1.json', import.meta.url).href,
			scale: 2,
		},
	},
	H2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h2.json', import.meta.url).href,
			scale: 2,
		},
	},
	H3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h3.json', import.meta.url).href,
			scale: 2,
		},
	},
	H4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h4.json', import.meta.url).href,
			scale: 2,
		},
	},
	H5: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/h5.json', import.meta.url).href,
			scale: 2,
		},
	},
	L1: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l1.json', import.meta.url).href,
			scale: 2,
		},
	},
	L2: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l2.json', import.meta.url).href,
			scale: 2,
		},
	},
	L3: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l3.json', import.meta.url).href,
			scale: 2,
		},
	},
	L4: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols/symbols.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols/l4.json', import.meta.url).href,
			scale: 2,
		},
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/S.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/W.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	uiBalanceBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/balanceBG.png', import.meta.url).href,
	},
	uiWinBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/winBG.png', import.meta.url).href,
	},
	uiBetBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/betBG.png', import.meta.url).href,
	},
	uiButtonMenuBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/violetBG.png', import.meta.url).href,
	},
	uiButtonBuyBonusBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/brownBG.png', import.meta.url).href,
	},
	uiButtonFooterBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/footerBG.png', import.meta.url).href,
	},
	uiFooterBarBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/footerBG_Bar.png', import.meta.url).href,
	},
	uiRemadeLogo: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/Logo.png', import.meta.url).href,
	},
	uiRemadeBalanceBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/BallanceBG.png', import.meta.url).href,
	},
	uiRemadeBalanceWinBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/BallanceBG_2.png', import.meta.url).href,
	},
	uiRemadeBetAmountBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/BetAmmountBG.png', import.meta.url).href,
	},
	uiRemadeSpinClusterBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/BetBG.png', import.meta.url).href,
	},
	uiRemadeSpinButtonBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/BetBTN.png', import.meta.url).href,
	},
	uiRemadeBuyBonusBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/BonusBG.png', import.meta.url).href,
	},
	uiRemadeAutoSpinBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/AutospinBTN.png', import.meta.url).href,
	},
	uiRemadeTurboBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/TurboBTN.png', import.meta.url).href,
	},
	uiRemadeFreeSpinCounterBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/FreeSpinBG.png', import.meta.url).href,
	},
	uiRemadeArrowDown: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/ArrowDown.png', import.meta.url).href,
	},
	uiRemadeArrowUp: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/ArrowUp.png', import.meta.url).href,
	},
	uiRemadeMenuBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/Menu.png', import.meta.url).href,
	},
	uiRemadeSettingsBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/SettingsBG.png', import.meta.url).href,
	},
	uiRemadeInfoIcon: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/Info.png', import.meta.url).href,
	},
	uiRemadeSoundIcon: {
		type: 'sprite',
		src: new URL('../../assets/sprites/remadeUI/Sound.png', import.meta.url).href,
	},
	uiButtonMinus: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/Minus.png', import.meta.url).href,
	},
	uiButtonPlus: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/Plus.png', import.meta.url).href,
	},
	uiMenuOptionButtonBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/menuButtonBG.png', import.meta.url).href,
	},
	uiButtonExit: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/Exit.png', import.meta.url).href,
	},
	uiSettingsPanelBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/panels/panelBG_elonged.png', import.meta.url).href,
	},
	uiSettingsSliderEmpty: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/sliderEmpty.png', import.meta.url).href,
	},
	uiSettingsSliderFilled: {
		type: 'sprite',
		src: new URL('../../assets/sprites/buttons/sliderFilled.png', import.meta.url).href,
	},
	buyBonusPanelIncrementBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/panels/incrementBG_panel.png', import.meta.url).href,
	},
	buyBonusPanelCurrencyBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/panels/currencyBG_panel.png', import.meta.url).href,
	},
	buyBonusPanelCardBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/panels/activationBG_panel.png', import.meta.url).href,
	},
	buyBonusPanelActivateBg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/panels/activateBG_panel.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	goldFont: {
		type: 'font',
		src: new URL('../../assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},
	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url)
				.href,
			scale: 2,
		},
	},
	globalMultiplierFrame: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/animationFrames/Skeletoncik.json', import.meta.url).href,
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL(
				'../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas',
				import.meta.url,
			).href,
			skeleton: new URL(
				'../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.json',
				import.meta.url,
			).href,
			scale: 2,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url)
				.href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},
	loadingProgressBackground: {
		type: 'sprite',
		src: new URL('../../assets/sprites/progressBar/Progress-Bar_BG.png', import.meta.url).href,
		preload: true,
	},
	loadingProgressFill: {
		type: 'sprite',
		src: new URL('../../assets/sprites/progressBar/Progress-Bar.png', import.meta.url).href,
		preload: true,
	},
	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url)
			.href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	symbolStaticL1: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol3.png', import.meta.url).href,
	},
	symbolStaticL2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol1.png', import.meta.url).href,
	},
	symbolStaticL3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol4.png', import.meta.url).href,
	},
	symbolStaticL4: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Symbol2.png', import.meta.url).href,
	},
	symbolStaticL5: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Ring.png', import.meta.url).href,
	},
	symbolStaticS: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/FreeSpinSymbol.png', import.meta.url).href,
	},
	symbolStaticW: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/CheryBoom.png', import.meta.url).href,
	},
	symbolStaticH1: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure1.png', import.meta.url).href,
	},
	symbolStaticH2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure3.png', import.meta.url).href,
	},
	symbolStaticH3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure2.png', import.meta.url).href,
	},
	symbolStaticH4: {
		type: 'sprite',
		src: new URL('../../assets/sprites/symbolsStatic/Symbols/Treasure4.png', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
	sound2: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds2.json', import.meta.url).href,
		preload: true,
	},
} as const;
