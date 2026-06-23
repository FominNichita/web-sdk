<script lang="ts">
	import { stateBet, stateModal, type BetModeData } from 'state-shared';
	import { Button } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BonusCard from './BonusCard.svelte';
	import { stateBonus } from '../stateBonus.svelte';
	import type { EmitterEventModal } from '../types';

	type Props = {
		list: BetModeData[];
	};

	const props: Props = $props();
	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

{#each props.list as betModeData}
	{#if betModeData.type !== 'default'}
		<BonusCard>
			{#snippet title()}
				<div class="title">
					{betModeData.text.title}
				</div>
			{/snippet}

			{#snippet description()}
				{#if betModeData?.text?.description}
					<div class="description">
						{betModeData.text.description}
					</div>
				{/if}
			{/snippet}

			{#snippet price()}
				<div class="price">
					{`${numberToCurrencyString(stateBet.betAmount * betModeData.costMultiplier)}`}
				</div>
			{/snippet}

			{#snippet button()}
				<Button
					onclick={() => {
						stateBonus.selectedBetModeKey = betModeData.mode;
						eventEmitter.broadcast({ type: 'buyBonusConfirm' });
						eventEmitter.broadcast({ type: 'soundPressGeneral' });
					}}
					disabled={stateBet.betAmount <= 0 ||
						stateBet.balanceAmount < stateBet.betAmount * betModeData.costMultiplier}
				>
					<span class="activate-button-bg">
						<span class="activate-button-text">{betModeData.text.button}</span>
					</span>
				</Button>
			{/snippet}
		</BonusCard>
	{/if}
{/each}

<style lang="scss">
	.title {
		max-width: 100%;
		font-family: 'Sancreek', serif;
		font-size: clamp(1rem, 1.7vw, 1.35rem);
		line-height: 1.05;
		color: #ffffff;
		-webkit-text-stroke: 1.5px #000000;
		paint-order: stroke fill;
		text-shadow: 0 1px 0 #000000;
		text-align: center;
		overflow-wrap: anywhere;
	}

	.description {
		max-width: 100%;
		font-family: 'KleeOne-SemiBold', sans-serif;
		font-size: clamp(0.58rem, 1.1vw, 0.78rem);
		line-height: 1.18;
		color: #ffffff;
		-webkit-text-stroke: 0.55px #000000;
		paint-order: stroke fill;
		text-shadow: 0 1px 0 #000000;
		text-align: center;
		min-height: 4.5rem;
		max-height: 6.4rem;
		white-space: pre-line;
		display: inline-flex;
		align-items: center;
		overflow: hidden;
	}

	.description:empty {
		display: none;
	}

	.price {
		max-width: 100%;
		font-family: 'Sancreek', serif;
		font-size: clamp(0.9rem, 1.5vw, 1.2rem);
		line-height: 1.05;
		color: #ffffff;
		-webkit-text-stroke: 1.2px #000000;
		paint-order: stroke fill;
		text-shadow: 0 1px 0 #000000;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.activate-button-bg {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: min(100%, 10.25rem);
		height: 2.6rem;
		padding: 0 1rem;
		margin: 0 auto;
		background-image: var(--lines-ui-activate-panel-url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		box-sizing: border-box;
	}

	.activate-button-text {
		display: block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: 'KleeOne-SemiBold', sans-serif;
		font-size: clamp(0.72rem, 1.2vw, 1rem);
		line-height: 1;
		color: #000000;
		-webkit-text-stroke: 0.35px #000000;
		paint-order: stroke fill;
		text-align: center;
	}

	@media (orientation: portrait) and (max-width: 520px) {
		.title {
			font-size: clamp(24px, 7vw, 32px);
		}

		.description {
			min-height: 0;
			max-height: min(180px, 23dvh);
			font-size: clamp(15px, 4.3vw, 19px);
			line-height: 1.3;
			overflow-y: auto;
		}

		.price {
			font-size: clamp(21px, 6vw, 28px);
		}

		.activate-button-bg {
			width: min(250px, 78vw);
			height: 58px;
			background-image: var(--lines-ui-menu-button-url);
		}

		.activate-button-text {
			font-family: 'LinesModalSancreek', Sancreek, serif;
			font-size: 20px;
		}
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.title {
			font-size: 20px;
		}

		.description {
			min-height: 64px;
			max-height: 92px;
			font-size: 12px;
		}

		.price {
			font-size: 18px;
		}

		.activate-button-bg {
			width: 160px;
			height: 42px;
		}

		.activate-button-text {
			font-size: 14px;
		}
	}
</style>
