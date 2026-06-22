<script lang="ts">
	import { stateUi, SINGLE_WIN_LIMIT_TEXT_OPTIONS, INFINITY_MARK } from 'state-shared';
	import { OptionsGrid } from 'components-shared';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
</script>

<span class="title">{i18nDerived.singleWinLimit()}</span>

<OptionsGrid
	miniSize
	value={stateUi.autoSpinsSingleWinLimitText}
	options={SINGLE_WIN_LIMIT_TEXT_OPTIONS}
	onchange={(value) => (stateUi.autoSpinsSingleWinLimitText = value)}
>
	{#snippet option({ option })}
		<BaseIcon
			width="100%"
			height="2rem"
			border={option === stateUi.autoSpinsSingleWinLimitText
				? '2px white solid'
				: '2px black solid'}
		/>
		<BaseButtonContent>
			{#if option === stateUi.autoSpinsSingleWinLimitText}
				<span class="auto-spin-option-selected" aria-hidden="true"></span>
			{/if}
			<span
				class:infinity={option === INFINITY_MARK}
				class="option-wrap"
				data-test="single-win-limit-options"
			>
				{option}
			</span>
		</BaseButtonContent>
	{/snippet}
</OptionsGrid>

<style lang="scss">
	.title {
		line-height: 2rem;
	}

	.option-wrap {
		white-space: nowrap;
	}

</style>
