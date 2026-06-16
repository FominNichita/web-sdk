<script lang="ts">
	import { stateBet, stateConfig } from 'state-shared';
	import { Button, OptionsToggle } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BuyBonusGradientText from './BuyBonusGradientText.svelte';
	import type { EmitterEventModal } from '../types';

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
		<div class="toggle-wrap">
			<div class="step-button">
				<Button data-test="down-button" disabled={disabledDown} onclick={toggleDown}>
					<span class="control-bg">
						<span class="symbol-text">
							<BuyBonusGradientText text="-" fontSize={44} viewBoxWidth={64} viewBoxHeight={64} />
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
					/>
				</span>
			</span>

			<div class="step-button">
				<Button data-test="up-button" disabled={disabledUp} onclick={toggleUp}>
					<span class="control-bg">
						<span class="symbol-text">
							<BuyBonusGradientText text="+" fontSize={44} viewBoxWidth={64} viewBoxHeight={64} />
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
		display: block;
		width: 2.75rem;
		height: 2.75rem;
	}

	.amount-text {
		display: block;
		width: 100%;
		height: 2.8rem;
		max-width: 100%;
		overflow: hidden;
	}
</style>
