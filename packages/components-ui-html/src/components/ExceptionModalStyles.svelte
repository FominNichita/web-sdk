<style lang="scss">
	:global(.pop-up-wrap:has(.fantasy-modal-exception) .blur-layer) {
		background: rgba(8, 6, 5, 0.72);
		backdrop-filter: blur(6px) brightness(0.55);
		-webkit-backdrop-filter: blur(6px) brightness(0.55);
	}

	:global(.pop-up-wrap:has(.fantasy-modal-exception) .close-button-wrap) {
		top: 1rem;
		right: 1rem;
	}

	:global(.pop-up-wrap:has(.fantasy-modal-exception) .close-button) {
		width: 2.25rem;
		height: 2.25rem;
	}

	:global(.fantasy-modal-exception) {
		width: min(46rem, 94vw);
		box-sizing: border-box;
		overflow: hidden;
		border: 2px solid #675132;
		border-radius: 6px;
		background:
			linear-gradient(rgba(19, 15, 13, 0.96), rgba(8, 7, 7, 0.98)),
			radial-gradient(circle at top, #4d3218, #080707 68%);
		box-shadow:
			0 0 0 2px #17100a,
			0 18px 60px rgba(0, 0, 0, 0.75);
		color: #f4ead8;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
	}

	:global(.fantasy-modal-exception .ui-popup-standard-content-wrap) {
		gap: 0;
		padding: 0;
	}

	:global(.fantasy-modal-exception .ui-modal-title-wrap) {
		width: 100%;
		box-sizing: border-box;
		padding: 1rem 4rem 0.75rem;
		border-bottom: 1px solid rgba(210, 167, 88, 0.28);
		background: transparent;
		color: #f4c55b;
		font-family: 'LinesModalSancreek', Sancreek, serif;
		font-size: clamp(1.8rem, 4vw, 3rem);
		line-height: 1;
		-webkit-text-fill-color: currentColor;
		-webkit-text-stroke: 0;
		text-shadow: 0 2px #000;
	}

	:global(.fantasy-modal-exception .exception-panel) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		width: 100%;
		min-height: 12rem;
		box-sizing: border-box;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.18);
	}

	:global(.fantasy-modal-exception .exception-subtitle) {
		color: #cbbd9f;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
		font-size: clamp(0.82rem, 2.2vw, 1rem);
		line-height: 1.35;
		text-shadow: 0 1px #000;
	}

	:global(.fantasy-modal-exception .exception-message) {
		width: min(36rem, 100%);
		max-height: 10rem;
		box-sizing: border-box;
		overflow-y: auto;
		padding: 1rem 1.25rem;
		border: 1px solid #4f4334;
		border-radius: 5px;
		background: rgba(42, 36, 31, 0.78);
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.04);
		color: #fff9e9;
		font-family: 'LinesModalKlee', 'KleeOne-SemiBold', serif;
		font-size: clamp(0.9rem, 2.4vw, 1.08rem);
		font-weight: 400;
		line-height: 1.45;
		text-align: center;
		text-shadow: none;
		scrollbar-width: thin;
		scrollbar-color: #8b6936 #171411;
	}

	:global(.fantasy-modal-error .exception-message) {
		display: grid;
		gap: 0.35rem;
		color: #fff9e9;
	}

	:global(.fantasy-modal-error .exception-code) {
		font-family: 'LinesModalSancreek', Sancreek, serif;
		font-size: 1.05em;
		color: #f0c76a;
	}

	:global(.fantasy-modal-error .exception-detail) {
		margin: 0;
		overflow-wrap: anywhere;
	}

	@media (max-width: 520px) {
		:global(.fantasy-modal-exception) {
			width: 96vw;
		}

		:global(.fantasy-modal-exception .ui-modal-title-wrap) {
			padding-inline: 3rem;
		}

		:global(.fantasy-modal-exception .exception-panel) {
			min-height: 11rem;
			padding: 0.75rem;
		}

		:global(.fantasy-modal-exception .exception-message) {
			max-height: 8rem;
			padding: 0.85rem 1rem;
		}
	}
</style>
