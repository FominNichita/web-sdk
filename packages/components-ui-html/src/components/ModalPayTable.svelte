<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

{#if stateModal.modal?.name === 'payTable'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		{@render props.children()}
	</Popup>
{/if}

<style lang="scss">
	:global(.pop-up-wrap:has(.paytable-modal) .blur-layer) {
		background: rgba(8, 6, 5, 0.72);
		backdrop-filter: blur(6px) brightness(0.55);
		-webkit-backdrop-filter: blur(6px) brightness(0.55);
	}

	:global(.pop-up-wrap:has(.paytable-modal) .close-button-wrap) {
		top: 1rem;
		right: 1rem;
	}

	:global(.pop-up-wrap:has(.paytable-modal) .close-button) {
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 0;
		background: var(--lines-ui-exit-button-url) center / contain no-repeat;
		color: transparent;
		font-size: 0;
		line-height: 0;
		filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8));
	}

	@media (max-width: 560px) {
		:global(.pop-up-wrap:has(.paytable-modal) .close-button-wrap) {
			top: max(12px, env(safe-area-inset-top));
			right: max(12px, env(safe-area-inset-right));
		}

		:global(.pop-up-wrap:has(.paytable-modal) .close-button) {
			width: 42px;
			height: 42px;
		}
	}

	@media (orientation: landscape) and (max-height: 500px) {
		:global(.pop-up-wrap:has(.paytable-modal) .close-button-wrap) {
			top: 8px;
			right: 8px;
		}

		:global(.pop-up-wrap:has(.paytable-modal) .close-button) {
			width: 34px;
			height: 34px;
		}
	}
</style>
