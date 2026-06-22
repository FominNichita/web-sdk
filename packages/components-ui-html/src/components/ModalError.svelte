<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseTitle from './BaseTitle.svelte';
	import FantasyModalStyles from './FantasyModalStyles.svelte';
	import ExceptionModalStyles from './ExceptionModalStyles.svelte';
</script>

{#if stateModal.modal?.name === 'error'}
	<Popup zIndex={zIndex.modal} persistent onclose={() => (stateModal.modal = null)}>
		<FantasyModalStyles />
		<ExceptionModalStyles />
		<div class="fantasy-modal fantasy-modal-exception fantasy-modal-error">
			<BaseContent maxWidth="100%">
				<BaseTitle>ERROR</BaseTitle>
				{@const error = stateModal.modal?.error}
				<div class="exception-panel">
					<span class="exception-subtitle">Sorry, something went wrong.</span>
					<div class="scrollY exception-message">
						{#if error}
							{#if error?.error && error?.message}
								<span class="exception-code">{error.error || 'unknown'}</span>
								<p class="exception-detail">{error.message || 'unknown'}</p>
							{:else}
								<p class="exception-detail">{error}</p>
							{/if}
						{:else}
							<span class="exception-code">unknown error</span>
						{/if}
					</div>
				</div>
			</BaseContent>
		</div>
	</Popup>
{/if}
