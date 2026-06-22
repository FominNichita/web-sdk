<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: Snippet;
		description: Snippet;
		price: Snippet;
		button: Snippet;
	};

	const props: Props = $props();
</script>

<div class="bonus-card-wrap">
	<div class="info">
		{@render props.title()}
		{@render props.description()}
		{@render props.price()}
	</div>
	{@render props.button()}
</div>

<style lang="scss">
	.bonus-card-wrap {
		position: relative;
		width: clamp(172px, 18vw, 220px);
		min-height: clamp(248px, 30vh, 310px);
		padding: 1.05rem 1rem 0.95rem;
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		background-image: var(--lines-ui-activation-panel-url);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		box-sizing: border-box;
		text-align: center;
		gap: 0.75rem;
		overflow: hidden;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.55rem;
		min-width: 0;
	}

	@media (orientation: portrait) and (max-width: 520px) {
		.bonus-card-wrap {
			width: min(340px, 86vw);
			min-height: min(390px, 52dvh);
			padding: 24px 22px 22px;
			gap: 14px;
		}

		.info {
			gap: 12px;
		}
	}
</style>
