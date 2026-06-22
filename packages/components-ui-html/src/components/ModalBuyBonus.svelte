<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { getContextLayout } from 'utils-layout';
	import { stateModal, stateMetaDerived } from 'state-shared';

	import BonusCards from './BonusCards.svelte';
	import BetMenuAmountToggle from './BetMenuAmountToggle.svelte';
	import BonusContentWrapLarge from './BonusContentWrapLarge.svelte';
	import BonusContentWrapPortrait from './BonusContentWrapPortrait.svelte';
	import BonusContentWrapLandscape from './BonusContentWrapLandscape.svelte';

	const { stateLayoutDerived } = getContextLayout();

	const activateList = $derived(
		stateMetaDerived.publishedBetModeMetaList().filter((item) => item.type === 'activate'),
	);

	const buyList = $derived(
		stateMetaDerived
			.publishedBetModeMetaList()
			.filter((item) => item.type === 'buy' && item.mode !== 'SUPER'),
	);

	const COMPONENT_MAP = {
		desktop: BonusContentWrapLarge,
		tablet: BonusContentWrapLarge,
		portrait: BonusContentWrapPortrait,
		landscape: BonusContentWrapLandscape,
	} as const;

	const BonusContentWrap = $derived(COMPONENT_MAP[stateLayoutDerived.layoutType()]);
</script>

{#if stateModal.modal?.name === 'buyBonus'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<div class="buy-bonus-modal-close-theme">
			<BonusContentWrap maxListLength={Math.max(activateList.length, buyList.length)}>
				{#snippet betAmount()}
					<BetMenuAmountToggle />
				{/snippet}

				{#snippet bonusCardsActivate()}
					<BonusCards list={activateList} />
				{/snippet}

				{#snippet bonusCardsBuy()}
					<BonusCards list={buyList} />
				{/snippet}
			</BonusContentWrap>
		</div>
	</Popup>
{/if}

<style lang="scss">
	.buy-bonus-modal-close-theme {
		display: contents;
	}

	:global(.pop-up-wrap:has(.buy-bonus-modal-close-theme) .close-button-wrap) {
		top: 1.25rem;
		right: 1.25rem;
	}

	:global(.pop-up-wrap:has(.buy-bonus-modal-close-theme) .close-button) {
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

	@media (orientation: portrait) and (max-width: 520px) {
		:global(.pop-up-wrap:has(.buy-bonus-modal-close-theme) .close-button-wrap) {
			top: max(12px, env(safe-area-inset-top));
			right: max(12px, env(safe-area-inset-right));
		}

		:global(.pop-up-wrap:has(.buy-bonus-modal-close-theme) .close-button) {
			width: 42px;
			height: 42px;
		}
	}
</style>
