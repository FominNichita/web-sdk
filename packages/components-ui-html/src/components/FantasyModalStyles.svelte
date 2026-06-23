<style lang="scss">
	:global(.pop-up-wrap:has(.fantasy-modal) .blur-layer) {
		background:
			radial-gradient(circle at center, rgba(70, 39, 14, 0.18), rgba(12, 7, 3, 0.78)),
			rgba(0, 0, 0, 0.58);
		backdrop-filter: blur(5px) brightness(0.62);
		-webkit-backdrop-filter: blur(5px) brightness(0.62);
	}

	:global(.pop-up-wrap:has(.fantasy-modal) .close-button-wrap) {
		top: 1.25rem;
		right: 1.25rem;
	}

	:global(.pop-up-wrap:has(.fantasy-modal) .close-button) {
		width: 2.025rem;
		height: 2.025rem;
		padding: 0;
		border: 0;
		background: var(--lines-ui-exit-button-url) center / contain no-repeat;
		color: transparent;
		font-size: 0;
		line-height: 0;
		filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.75));
	}

	:global(.fantasy-modal) {
		width: min(25rem, 92vw);
		color: #efe1c5;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
		text-align: center;
		pointer-events: auto;
	}

	:global(.fantasy-modal .ui-popup-standard-content-wrap) {
		width: 100%;
		max-width: 100%;
		gap: 0.45rem;
		padding: 0.5rem 0.75rem;
		box-sizing: border-box;
	}

	:global(.fantasy-modal .ui-modal-title-wrap) {
		color: #e7a926;
		background: linear-gradient(180deg, #e18d28 0%, #fee17e 31%, #f1b63d 66%, #7b4d16 100%);
		background-clip: text;
		-webkit-background-clip: text;
		font-family: 'LinesModalSancreek', Sancreek, serif;
		font-size: clamp(1.65rem, 5vw, 2.45rem);
		line-height: 1;
		letter-spacing: 0;
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke: 1px #050505;
		paint-order: stroke fill;
	}

	:global(.fantasy-modal .subtitle),
	:global(.fantasy-modal .menu-subtitle) {
		margin-top: -0.15rem;
		color: #dfd4c0;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
		font-size: 0.72rem;
		line-height: 1;
		text-shadow: 0 1px 2px #000;
	}

	:global(.fantasy-modal .wrap) {
		min-width: 0;
		width: 100%;
	}

	:global(.fantasy-modal .grid) {
		grid-template-columns: repeat(3, 1fr) !important;
		gap: 0.55rem 0.65rem;
		width: min(21.875rem, 100%);
		margin: 0 auto;
	}

	:global(.fantasy-modal .rectangle) {
		height: 2.5rem;
		border: 0 !important;
		border-radius: 0;
		background: var(--lines-ui-activate-panel-url) center / 100% 100% no-repeat !important;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.65);
	}

	:global(.fantasy-modal .grid .base-button-content span) {
		font-size: 1.25rem !important;
		color: #080808 !important;
		-webkit-text-fill-color: #080808;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
	}

	:global(.fantasy-modal .grid .base-button-content span.infinity) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		font-family: inherit;
		font-size: 1.45rem !important;
		font-weight: inherit;
		line-height: 1 !important;
		transform: translateY(-2px);
	}

	:global(.fantasy-modal .base-button-content) {
		color: #080808;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
		font-weight: 700;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
	}

	:global(.fantasy-modal .button:hover .rectangle) {
		filter: brightness(1.08);
	}

	:global(.fantasy-modal .button.disabled) {
		opacity: 0.45;
	}

	:global(.fantasy-modal .ui-modal-button-wrap) {
		margin-top: 0.35rem;
	}

	:global(.fantasy-modal .ui-modal-button-wrap .full-width),
	:global(.fantasy-modal .ui-modal-button-wrap .max-width) {
		width: min(11rem, 100%);
	}

	:global(.fantasy-modal .ui-modal-button-wrap .rectangle) {
		height: 3rem;
		background: var(--lines-ui-menu-button-url) center / 100% 100% no-repeat;
	}

	:global(.fantasy-modal .ui-modal-button-wrap .base-button-content) {
		font-family: 'LinesModalSancreek', Sancreek, serif;
		color: #080808 !important;
		-webkit-text-fill-color: #080808;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
	}

	:global(.fantasy-modal .ui-modal-button-wrap .base-button-content span) {
		color: #080808 !important;
		-webkit-text-fill-color: #080808;
	}

	:global(.fantasy-modal .toggle) {
		margin-top: 0.3rem;
		padding: 0.25rem 0.7rem 0.28rem;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 999px;
		background: rgba(50, 50, 50, 0.72);
		color: #e4dfd6;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
		font-size: 0.7rem;
		text-transform: uppercase;
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.12);
	}

	:global(.fantasy-modal .advanced-panel) {
		margin-top: 0.45rem;
		padding: 0.6rem;
		border: 1px solid rgba(219, 197, 151, 0.38);
		border-radius: 0.35rem;
		background: rgba(0, 0, 0, 0.28);
	}

	:global(.fantasy-modal-bet) {
		width: min(34rem, 94vw);
	}

	:global(.fantasy-modal-auto-spin) {
		width: min(34rem, 94vw);
	}

	:global(.fantasy-modal-bet .grid) {
		width: min(33.75rem, 100%);
	}

	:global(.fantasy-modal-auto-spin .wrap) {
		width: min(33.75rem, 100%);
		min-width: 0;
		flex: 0 0 auto;
	}

	:global(.fantasy-modal-auto-spin .content.column),
	:global(.fantasy-modal-auto-spin .content-wrap) {
		width: 100%;
	}

	:global(.fantasy-modal-auto-spin .grid) {
		width: 100%;
		grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
		grid-auto-rows: 2.5rem;
		align-items: center;
	}

	:global(.fantasy-modal-auto-spin .grid .button) {
		width: 100%;
		height: 2.5rem;
		min-width: 0;
	}

	:global(.fantasy-modal-auto-spin .grid .rectangle) {
		width: 100%;
		height: 2.5rem !important;
	}

	:global(.fantasy-modal-auto-spin .grid .button:has(.auto-spin-option-selected) .rectangle),
	:global(.fantasy-modal-bet .grid .button:has(.bet-option-selected) .rectangle) {
		background: var(--lines-ui-activate-panel-hover-url) center / 100% 100% no-repeat !important;
	}

	:global(.fantasy-modal-auto-spin .advanced-panel) {
		width: min(33.75rem, 100%);
		flex: 0 0 auto;
		box-sizing: border-box;
	}

	@media (orientation: portrait) and (max-width: 520px) {
		:global(.pop-up-wrap:has(.fantasy-modal) .close-button-wrap) {
			top: max(12px, env(safe-area-inset-top));
			right: max(12px, env(safe-area-inset-right));
		}

		:global(.pop-up-wrap:has(.fantasy-modal) .close-button) {
			width: 42px;
			height: 42px;
		}

		:global(.fantasy-modal),
		:global(.fantasy-modal-bet),
		:global(.fantasy-modal-auto-spin) {
			width: min(96vw, 480px);
			max-height: calc(100dvh - max(32px, env(safe-area-inset-top)) - 20px);
		}

		:global(.fantasy-modal .ui-popup-standard-content-wrap) {
			max-height: inherit;
			gap: 10px;
			padding: 18px 14px 16px;
		}

		:global(.fantasy-modal .ui-modal-title-wrap) {
			font-size: clamp(32px, 10vw, 44px);
		}

		:global(.fantasy-modal .subtitle),
		:global(.fantasy-modal .menu-subtitle) {
			margin-top: -2px;
			font-size: 15px;
			line-height: 1.15;
		}

		:global(.fantasy-modal .content.column) {
			gap: 12px;
			width: 100%;
			max-height: calc(100dvh - 190px);
			overflow-y: auto;
			overscroll-behavior: contain;
		}

		:global(.fantasy-modal .grid) {
			gap: 9px 10px;
			width: 100%;
		}

		:global(.fantasy-modal .grid .button),
		:global(.fantasy-modal .grid .rectangle),
		:global(.fantasy-modal-auto-spin .grid .button),
		:global(.fantasy-modal-auto-spin .grid .rectangle) {
			height: 50px !important;
		}

		:global(.fantasy-modal-auto-spin .grid) {
			grid-auto-rows: 50px;
		}

		:global(.fantasy-modal .grid .base-button-content span) {
			font-size: 22px !important;
			line-height: 1;
		}

		:global(.fantasy-modal .grid .base-button-content span.infinity) {
			font-size: 26px !important;
			transform: translateY(-3px);
		}

		:global(.fantasy-modal .toggle) {
			margin-top: 4px;
			padding: 7px 14px 8px;
			font-size: 14px;
		}

		:global(.fantasy-modal .advanced-panel) {
			margin-top: 8px;
			padding: 12px;
		}

		:global(.fantasy-modal .advanced-panel .title) {
			font-size: 15px;
			line-height: 1.3;
		}

		:global(.fantasy-modal .ui-modal-button-wrap) {
			margin-top: 6px;
		}

		:global(.fantasy-modal .ui-modal-button-wrap .full-width),
		:global(.fantasy-modal .ui-modal-button-wrap .max-width) {
			width: min(250px, 78vw);
		}

		:global(.fantasy-modal .ui-modal-button-wrap .rectangle) {
			height: 58px;
		}

		:global(.fantasy-modal .ui-modal-button-wrap .base-button-content span) {
			font-size: 20px !important;
		}
	}
</style>
