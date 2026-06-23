<script lang="ts">
	import { stateBet, stateConfig } from 'state-shared';
	import { Button, OptionsToggle } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BuyBonusGradientText from './BuyBonusGradientText.svelte';
	import type { EmitterEventModal } from '../types';

	type Props = {
		compactControls?: boolean;
	};

	const props: Props = $props();
	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

<OptionsToggle
	value={stateBet.betAmount}
	options={stateConfig.betAmountOptions}
	onchange={(value) => {
		stateBet.betAmount = value;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
	}}
>
	{#snippet children({ disabledDown, disabledUp, toggleDown, toggleUp })}
		<div class="toggle-wrap" class:compact-controls={props.compactControls}>
			<div class="step-button">
				<Button data-test="down-button" disabled={disabledDown} onclick={toggleDown}>
					<span class="control-bg">
						<span class="symbol-text">
							<BuyBonusGradientText
								text="-"
								fontSize={54}
								viewBoxWidth={64}
								viewBoxHeight={64}
								centerYRatio={0.65}
							/>
						</span>
					</span>
				</Button>
			</div>

			<span class="amount-bg">
				<span class="amount-text">
					<BuyBonusGradientText
						text={numberToCurrencyString(stateBet.betAmount)}
						fontSize={30}
						viewBoxWidth={230}
						viewBoxHeight={64}
						maxWidth={190}
						strokeWidth={2.5}
						centerYRatio={0.64}
					/>
				</span>
			</span>

			<div class="step-button">
				<Button data-test="up-button" disabled={disabledUp} onclick={toggleUp}>
					<span class="control-bg">
						<span class="symbol-text">
							<BuyBonusGradientText
								text="+"
								fontSize={54}
								viewBoxWidth={64}
								viewBoxHeight={64}
								centerYRatio={0.65}
							/>
						</span>
					</span>
				</Button>
			</div>
		</div>
	{/snippet}
</OptionsToggle>

<style lang="scss">
	.toggle-wrap {
		--bet-toggle-control-size: 4rem;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		width: min(100%, 24rem);
	}

	.step-button {
		width: var(--bet-toggle-control-size);
		height: var(--bet-toggle-control-size);
		flex: 0 0 var(--bet-toggle-control-size);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-button :global(.button) {
		width: var(--bet-toggle-control-size);
		height: var(--bet-toggle-control-size);
		align-items: center;
	}

	.control-bg,
	.amount-bg {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}

	.control-bg {
		width: var(--bet-toggle-control-size);
		height: var(--bet-toggle-control-size);
		background-image: var(--lines-ui-increment-panel-url);
	}

	.amount-bg {
		width: min(15rem, 56vw);
		height: var(--bet-toggle-control-size);
		padding: 0 1rem;
		background-image: var(--lines-ui-currency-panel-url);
		box-sizing: border-box;
	}

	.symbol-text {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
	}

	.symbol-text :global(svg) {
		width: 100%;
		height: 100%;
	}

	.amount-text {
		display: block;
		width: 100%;
		height: 2.8rem;
		max-width: 100%;
		overflow: hidden;
	}

	@media (orientation: portrait) and (max-width: 520px) {
		.toggle-wrap {
			--bet-toggle-control-size: 48px;
			--bet-toggle-amount-height: 64px;

			gap: 6px;
			width: auto;
		}

		.amount-bg {
			width: min(192px, 54vw);
			height: var(--bet-toggle-amount-height);
			padding-inline: 12px;
		}

		.symbol-text {
			width: 40px;
			height: 40px;
		}

		.amount-text {
			height: 46px;
		}

		.toggle-wrap.compact-controls {
			--bet-toggle-control-size: 48px;
			width: auto;
		}

		.toggle-wrap.compact-controls .symbol-text {
			width: 36px;
			height: 36px;
		}

		.toggle-wrap.compact-controls .amount-bg {
			width: 192px;
		}
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.toggle-wrap {
			--bet-toggle-control-size: 48px;
			gap: 6px;
			width: auto;
		}

		.amount-bg {
			width: 192px;
			height: 64px;
			padding-inline: 16px;
		}

		.symbol-text {
			width: 40px;
			height: 40px;
		}

		.amount-text {
			height: 44px;
		}

		.toggle-wrap.compact-controls {
			--bet-toggle-control-size: 48px;
			width: auto;
		}

		.toggle-wrap.compact-controls .symbol-text {
			width: 36px;
			height: 36px;
		}

		.toggle-wrap.compact-controls .amount-bg {
			width: 192px;
		}
	}
</style>
