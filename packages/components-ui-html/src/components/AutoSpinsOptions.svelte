<script lang="ts">
	import { stateUi, AUTO_SPINS_TEXT_OPTIONS, INFINITY_MARK } from 'state-shared';
	import { OptionsGrid } from 'components-shared';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';

	const options = AUTO_SPINS_TEXT_OPTIONS;
</script>

<OptionsGrid
	value={stateUi.autoSpinsText}
	{options}
	onchange={(value) => (stateUi.autoSpinsText = value)}
>
	{#snippet option({ option })}
		<BaseIcon
			width="100%"
			height="2.5rem"
			border={option === stateUi.autoSpinsText ? '2px white solid' : '2px black solid'}
		/>
		<BaseButtonContent>
			{#if option === stateUi.autoSpinsText}
				<span class="auto-spin-option-selected" aria-hidden="true"></span>
			{/if}
			<span class:infinity={option === INFINITY_MARK} data-test="round-options">
				{option}
			</span>
		</BaseButtonContent>
	{/snippet}
</OptionsGrid>
