<script lang="ts">
	import { blur } from 'svelte/transition';
	import { onDestroy, onMount, type Snippet } from 'svelte';

	import { waitForTimeout } from 'utils-shared/wait';
	import { getContextEventEmitter } from 'utils-event-emitter';

	import OnHotkey from './OnHotkey.svelte';

	type PopupSoundEvent = { type: 'soundPressGeneral' };

	type Props = {
		children: Snippet;
		zIndex: number;
		persistent?: boolean;
		onclose: () => void;
	};

	const props: Props = $props();
	const eventEmitterContext = getContextEventEmitter<PopupSoundEvent>();

	const zIndexInternal = {
		topLayer: 2,
		clickToCloseLayer: 2,
		closeButton: 101,
		contentLayer: 100,
	};

	const closeModal = () => (props.persistent ? undefined : props.onclose());
	const closeModalFromButton = () => {
		eventEmitterContext?.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		closeModal();
	};
	const closeModalFromBackdrop = (event: MouseEvent | KeyboardEvent) => {
		if (event.target !== event.currentTarget) return;
		closeModal();
	};

	let disabled = $state(true);
	let previousBodyOverflow = '';
	let previousDocumentOverflow = '';

	onMount(async () => {
		previousBodyOverflow = document.body.style.overflow;
		previousDocumentOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		await waitForTimeout(300);

		disabled = false;
	});

	onDestroy(() => {
		document.body.style.overflow = previousBodyOverflow;
		document.documentElement.style.overflow = previousDocumentOverflow;
	});
</script>

<div>
	{@render props.children()}
</div>

<OnHotkey hotkey="Escape" onpress={closeModal} />

<div class="pop-up-wrap" class:disabled style={`z-index: ${props.zIndex};`}>
	<div class="blur-layer"></div>
	<div
		class="top-layer"
		style="--zIndex: {zIndexInternal.topLayer}"
		in:blur={{ duration: 300, opacity: 0 }}
	>
		<div
			tabindex={0}
			class="click-to-close-layer"
			onclick={closeModalFromBackdrop}
			onkeypress={closeModalFromBackdrop}
			role="button"
			style="--zIndex: {zIndexInternal.clickToCloseLayer}"
		></div>

		{#if !props.persistent}
			<div class="close-button-wrap" style="--zIndex: {zIndexInternal.closeButton}">
				<button class="close-button" data-test="close-button" onclick={closeModalFromButton}>×</button>
			</div>
		{/if}
		<div class="content-layer" style="--zIndex: {zIndexInternal.contentLayer}">
			{@render props.children()}
		</div>
	</div>
</div>

<style lang="scss">
	.pop-up-wrap {
		font-family: 'proxima-nova', sans-serif;
		touch-action: manipulation;
		color: white;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		overscroll-behavior: contain;

		display: flex !important;
		justify-content: center;
		align-items: center;

		&.disabled {
			pointer-events: none;
		}
	}

	.blur-layer {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
	}

	.top-layer {
		width: 100%;
		height: 100%;
		z-index: var(--zIndex);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.click-to-close-layer {
		z-index: var(--zIndex);

		position: absolute;
		width: 100%;
		height: 100%;
	}

	.content-layer {
		position: relative;
		z-index: var(--zIndex);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.close-button-wrap {
		position: absolute;
		top: 0;
		right: 0;
		z-index: var(--zIndex);
	}

	.close-button {
		cursor: pointer;
		color: white;
		font-size: 3rem;
		font-weight: 900;
		background-color: transparent;
		border-color: transparent;
		line-height: 0px; /* to remove the button style influence */
		width: 3rem;
		height: 3rem;
	}
</style>
