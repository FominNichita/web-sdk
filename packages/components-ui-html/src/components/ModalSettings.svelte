<script lang="ts">
	import { zIndex } from 'constants-shared/zIndex';
	import { Popup } from 'components-shared';
	import { stateModal, stateSound } from 'state-shared';

	import BaseTitle from './BaseTitle.svelte';
	import BaseContent from './BaseContent.svelte';
	import ModalSettingsSound from './ModalSettingsSound.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
</script>

{#if stateModal.modal?.name === 'settings'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<div class="settings-modal">
			<BaseContent maxWidth="100%">
				<BaseTitle>SOUND</BaseTitle>
				<div class="settings-panel">
					<div class="settings-rows">
						<ModalSettingsSound bind:value={stateSound.volumeValueMaster}>
							{i18nDerived.masterVolume()}
						</ModalSettingsSound>

						<ModalSettingsSound bind:value={stateSound.volumeValueMusic}>
							{i18nDerived.musicVolume()}
						</ModalSettingsSound>

						<ModalSettingsSound bind:value={stateSound.volumeValueSoundEffect}>
							{i18nDerived.soundEffectVolume()}
						</ModalSettingsSound>
					</div>
				</div>
			</BaseContent>
		</div>
	</Popup>
{/if}

<style lang="scss">
	.settings-modal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(0.7rem, 2vw, 1rem);
		width: min(92vw, 760px);
		font-family: 'Sancreek', serif;
		color: #989898;

		:global(.ui-modal-title-wrap) {
			font-size: clamp(2.4rem, 7vw, 4.8rem);
			line-height: 1;
			color: #e7a926;
			background: linear-gradient(
				180deg,
				#e18d28 0%,
				#fee17e 31%,
				#f1b63d 66%,
				#7b4d16 100%
			);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			-webkit-text-stroke: 1px #050505;
			paint-order: stroke fill;
		}
	}

	:global(.pop-up-wrap:has(.settings-modal) .close-button-wrap) {
		top: 1.25rem;
		right: 1.25rem;
	}

	:global(.pop-up-wrap:has(.settings-modal) .close-button) {
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

	.settings-panel {
		width: 100%;
		aspect-ratio: 800 / 414;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(2.2rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem);
		background-image: var(--lines-ui-settings-panel-url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}

	.settings-rows {
		width: min(100%, 620px);
		display: flex;
		flex-direction: column;
		gap: clamp(0.7rem, 2.3vw, 1.45rem);
	}

	@media (max-width: 520px) {
		.settings-modal {
			width: min(96vw, 560px);
			gap: 12px;

			:global(.ui-modal-title-wrap) {
				font-size: clamp(38px, 11vw, 52px);
			}
		}

		.settings-panel {
			aspect-ratio: 800 / 650;
			padding: 44px 24px 38px;
		}

		.settings-rows {
			gap: 24px;
		}

		:global(.pop-up-wrap:has(.settings-modal) .close-button-wrap) {
			top: max(12px, env(safe-area-inset-top));
			right: max(12px, env(safe-area-inset-right));
		}

		:global(.pop-up-wrap:has(.settings-modal) .close-button) {
			width: 42px;
			height: 42px;
		}
	}
</style>
