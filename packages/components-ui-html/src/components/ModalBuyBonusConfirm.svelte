<script lang="ts">
	import { Button, Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateBet, stateModal, stateUi, INFINITY_MARK } from 'state-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';

	import BaseTitle from './BaseTitle.svelte';
	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import BaseButtonWrap from './BaseButtonWrap.svelte';
	import { stateBonus, stateBonusDerived } from '../stateBonus.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

	const selectedBetModeData = $derived(stateBonusDerived.selectedBetModeData());
	const selectedBetModeSupported = $derived(stateBonus.selectedBetModeKey !== 'SUPER');

	const confirm = () => {
		if (!selectedBetModeData || !selectedBetModeSupported) return;

		stateBet.activeBetModeKey = stateBonus.selectedBetModeKey;

		if (selectedBetModeData.type === 'buy') {
			eventEmitter.broadcast({ type: 'bet' });
		}

		if (selectedBetModeData.type === 'activate') {
			stateUi.autoSpinsLossLimitText = INFINITY_MARK;
			stateUi.autoSpinsSingleWinLimitText = INFINITY_MARK;
		}
	};
</script>

{#if stateModal.modal?.name === 'buyBonusConfirm' && selectedBetModeData && selectedBetModeSupported}
	<Popup zIndex={zIndex.dialog} onclose={() => (stateModal.modal = { name: 'buyBonus' })}>
		<BaseContent maxWidth="500px">
			<BaseTitle>
				<span class="confirm-title">{selectedBetModeData.text.title}</span>
			</BaseTitle>
			<BaseScrollable type="column">
				<span class="confirm-dialog">{selectedBetModeData.text.dialog}</span>
			</BaseScrollable>
			<BaseButtonWrap type="max-width">
				<Button
					data-test="confirm-button"
					onclick={() => {
						confirm();
						eventEmitter.broadcast({ type: 'soundPressGeneral' });
						stateModal.modal = null;
					}}
				>
					<span class="confirm-button-bg">
						<span class="confirm-button-text">{i18nDerived.confirm()}</span>
					</span>
				</Button>
			</BaseButtonWrap>
		</BaseContent>
	</Popup>
{/if}

<style lang="scss">
	.confirm-title {
		display: block;
		max-width: min(28rem, 86vw);
		font-family: 'Sancreek', serif;
		font-size: clamp(1.35rem, 3vw, 2.2rem);
		line-height: 1.05;
		color: #ffffff;
		-webkit-text-stroke: 1.5px #000000;
		paint-order: stroke fill;
		text-align: center;
		text-shadow: 0 1px 0 #000000;
		overflow-wrap: anywhere;
	}

	.confirm-dialog {
		display: block;
		max-width: min(28rem, 86vw);
		max-height: min(34vh, 14rem);
		overflow: hidden;
		font-family: 'KleeOne-SemiBold', sans-serif;
		font-size: clamp(0.9rem, 1.7vw, 1.08rem);
		line-height: 1.25;
		color: #ffffff;
		-webkit-text-stroke: 0.55px #000000;
		paint-order: stroke fill;
		text-align: center;
		text-shadow: 0 1px 0 #000000;
		white-space: pre-line;
	}

	.confirm-button-bg {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 3rem;
		padding: 0 1rem;
		background-image: var(--lines-ui-activate-panel-url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		box-sizing: border-box;
	}

	.confirm-button-text {
		display: block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: 'KleeOne-SemiBold', sans-serif;
		font-size: clamp(0.9rem, 1.6vw, 1.1rem);
		line-height: 1;
		color: #000000;
		-webkit-text-stroke: 0.35px #000000;
		paint-order: stroke fill;
		text-align: center;
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.confirm-title {
			max-width: 70vw;
			font-size: 25px;
		}

		.confirm-dialog {
			max-width: 72vw;
			max-height: 28dvh;
			font-size: 14px;
			overflow-y: auto;
		}

		.confirm-button-bg {
			width: 190px;
			min-height: 40px;
		}
	}

	@media (orientation: landscape) and (max-height: 300px) {
		.confirm-title {
			font-size: 19px;
		}

		.confirm-dialog {
			max-height: 24dvh;
			font-size: 11px;
		}

		.confirm-button-bg {
			min-height: 32px;
		}
	}
</style>
