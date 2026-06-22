<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		value: number;
		children: Snippet;
	};

	let { value = $bindable(), children }: Props = $props();
	const fillInset = $derived(`${100 - Math.max(0, Math.min(100, Number(value) || 0))}%`);
</script>

<div class="settings-row">
	<div class="label" title="">
		<span>{@render children()}</span>
	</div>

	<label class="slider" aria-label="Volume">
		<span class="slider-empty"></span>
		<span class="slider-filled" style={`clip-path: inset(0 ${fillInset} 0 0);`}></span>
		<input bind:value type="range" min="0" max="100" step="1" />
	</label>

	<div class="value">{Math.round(Number(value) || 0)}</div>
</div>

<style lang="scss">
	.settings-row {
		--value-width: 3.4rem;
		display: grid;
		grid-template-columns: minmax(8.5rem, 1fr) minmax(9rem, 1.35fr) var(--value-width);
		align-items: center;
		column-gap: clamp(0.6rem, 2.2vw, 1.3rem);
		color: #989898;
		font-family: 'Sancreek', serif;
	}

	.label,
	.value {
		font-size: clamp(1rem, 2.6vw, 1.75rem);
		line-height: 1;
		text-shadow: 0 2px 0 rgba(0, 0, 0, 0.5);
	}

	.label {
		min-width: 0;

		span {
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: clip;
		}
	}

	.value {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.slider {
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 329 / 14;
		cursor: pointer;
		touch-action: none;
	}

	.slider-empty,
	.slider-filled {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		pointer-events: none;
		user-select: none;
	}

	.slider-empty {
		background-image: var(--lines-ui-slider-empty-url);
	}

	.slider-filled {
		background-image: var(--lines-ui-slider-filled-url);
	}

	input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	@media (max-width: 520px) {
		.settings-row {
			--value-width: 48px;
			grid-template-columns: minmax(0, 1fr) var(--value-width);
			row-gap: 9px;
			column-gap: 12px;
		}

		.label,
		.value {
			font-size: 20px;
			line-height: 1.1;
		}

		.slider {
			grid-column: 1 / -1;
			grid-row: 2;
			min-height: 12px;
		}
	}
</style>
