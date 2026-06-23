<script lang="ts">
	import type { Snippet } from 'svelte';

	import { getContextLayout } from 'utils-layout';
	import { resizeObserver, type ContentRect } from 'utils-resize-observer';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';

	type Props = {
		maxListLength: number;
		betAmount: Snippet;
		bonusCardsActivate: Snippet;
		bonusCardsBuy: Snippet;
	};

	const props: Props = $props();

	const { stateLayoutDerived } = getContextLayout();

	let contentRect = $state({ width: 0, height: 0, left: 0, top: 0 } as ContentRect);

	const shortLandscape = $derived(stateLayoutDerived.canvasSizes().height <= 500);
	const verticalScale = $derived(
		stateLayoutDerived.canvasSizes().height / (270 * 2),
	);
	const horizontalScale = $derived(
		(stateLayoutDerived.canvasSizes().width - 250) / (contentRect?.width || 0),
	);
	const scale = $derived(Math.min(verticalScale, horizontalScale));
	const shortLandscapeScale = $derived(
		Math.min(
			0.86,
			(stateLayoutDerived.canvasSizes().height - 20) / 410,
			(stateLayoutDerived.canvasSizes().width - 32) / 400,
		),
	);
</script>

<BaseContent maxWidth="100%">
	{#if shortLandscape}
		<div
			class="short-landscape-composition"
			style={`--short-landscape-scale: ${shortLandscapeScale};`}
		>
			<div class="short-landscape-amount">
				{@render props.betAmount()}
			</div>

			<div class="short-landscape-bonuses">
				<BaseScrollable type="row" noScroll>
					{@render props.bonusCardsActivate()}
				</BaseScrollable>

				<BaseScrollable type="row" noScroll>
					{@render props.bonusCardsBuy()}
				</BaseScrollable>
			</div>
		</div>
	{:else}
		<div class="bonuses-wrap" use:resizeObserver={(value) => (contentRect = value)}>
			<div class="bonuses" style="transform: scale({Math.min(scale, 1)});">
				<BaseScrollable type="row" noScroll>
					{@render props.bonusCardsActivate()}
				</BaseScrollable>

				<BaseScrollable type="row" noScroll>
					{@render props.bonusCardsBuy()}
				</BaseScrollable>
			</div>
		</div>

		<div class="badge-amount-wrap">
			{@render props.betAmount()}
		</div>
	{/if}
</BaseContent>

<style lang="scss">
	.bonuses-wrap {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(calc(-50% - 7rem), -50%);
	}

	.bonuses {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		transform-origin: center center;
	}

	.badge-amount-wrap {
		position: fixed;
		top: calc(50% + 1.2rem);
		right: 1rem;
		transform: translateY(-50%);
	}

	.short-landscape-composition {
		position: fixed;
		left: 50%;
		top: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		width: 400px;
		transform: translate(-50%, -50%) scale(var(--short-landscape-scale));
		transform-origin: center center;
	}

	.short-landscape-amount {
		flex: 0 0 auto;
	}

	.short-landscape-bonuses {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}
</style>
