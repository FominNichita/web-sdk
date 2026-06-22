<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseTitle from './BaseTitle.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import FantasyModalStyles from './FantasyModalStyles.svelte';
	import ExceptionModalStyles from './ExceptionModalStyles.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	const messageMap = $derived({
		lossLimitReached: i18nDerived.lossLimitReached(),
		singleWinLimitReached: i18nDerived.singleWinLimitReached(),
		insufficientFunds: i18nDerived.insufficientFunds(),
	});
</script>

{#if stateModal.modal?.name === 'autoSpinMessage'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<FantasyModalStyles />
		<ExceptionModalStyles />
		<div class="fantasy-modal fantasy-modal-exception">
			<BaseContent maxWidth="100%">
				<BaseTitle>
					{i18nDerived.notification()}
				</BaseTitle>
				<div class="exception-panel">
					<BaseScrollable type="column">
						<span class="exception-subtitle" data-test="auto-spin-stop-info">
							{i18nDerived.autoSpinsStopInfo()}
						</span>
						<div class="scrollY exception-message" data-test="auto-spin-stop-content">
							{messageMap[stateModal.modal.message]}
						</div>
					</BaseScrollable>
				</div>
			</BaseContent>
		</div>
	</Popup>
{/if}
