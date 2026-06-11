<script lang="ts">
	import type { Snippet } from 'svelte';

	import { stateUi } from 'state-shared';

	import type { FooterBarLayoutProps } from '../types';
	import UIDefault from './UIDefault.svelte';
	import UIReplay from './UIReplay.svelte';

	type Props = {
		gameName: Snippet;
		logo: Snippet;
		footerBar?: Snippet<[FooterBarLayoutProps]>;
	};

	const props: Props = $props();

	const UI_COMPONENT_MAP = {
		default: UIDefault,
		replay: UIReplay,
	};

	const UIComponent = $derived(UI_COMPONENT_MAP[stateUi.config.mode]);
</script>

<UIComponent>
	{#snippet gameName()}
		{@render props.gameName()}
	{/snippet}

	{#snippet logo()}
		{@render props.logo()}
	{/snippet}

	{#snippet footerBar(layoutProps)}
		{#if props.footerBar}
			{@render props.footerBar(layoutProps)}
		{/if}
	{/snippet}
</UIComponent>
