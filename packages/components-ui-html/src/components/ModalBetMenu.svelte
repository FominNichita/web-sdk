<script lang="ts">
	import { Button, Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseIcon from './BaseIcon.svelte';
	import BaseTitle from './BaseTitle.svelte';
	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import BaseButtonWrap from './BaseButtonWrap.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import BetMenuAmountToggle from './BetMenuAmountToggle.svelte';
	import BetMenuAmountGrid from './BetMenuAmountGrid.svelte';
	import FantasyModalStyles from './FantasyModalStyles.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	const confirm = () => {
		stateModal.modal = null;
	};
</script>

{#if stateModal.modal?.name === 'betAmountMenu'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<FantasyModalStyles />
		<div class="fantasy-modal fantasy-modal-bet">
			<BaseContent maxWidth="100%">
				<BaseTitle>
					{i18nDerived.betMenu()}
				</BaseTitle>
				<BaseScrollable type="column">
					<span class="menu-subtitle">{i18nDerived.selectYourBet()}</span>
					<BetMenuAmountToggle />
					<BetMenuAmountGrid />
				</BaseScrollable>
				<BaseButtonWrap type="full-width">
					<Button data-test="confirm-button" onclick={confirm}>
						<BaseIcon width="100%" height="3rem" />
						<BaseButtonContent>
							<span style="font-size: 1rem;">{i18nDerived.confirm()}</span>
						</BaseButtonContent>
					</Button>
				</BaseButtonWrap>
			</BaseContent>
		</div>
	</Popup>
{/if}
