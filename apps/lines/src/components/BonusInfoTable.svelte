<script lang="ts">
	import { stateI18nDerived } from 'state-shared';

	import type { BonusAward } from '../game/bonusInfo';

	type Props = {
		rows: readonly BonusAward[];
		retrigger?: boolean;
	};

	const { rows, retrigger = false }: Props = $props();
	const translate = (key: string) => stateI18nDerived.translate(key);
</script>

<div class="award-table" role="table">
	<div class="award-row award-header" role="row">
		<span role="columnheader">{translate('BONUS_INFO_SCATTERS')}</span>
		<span role="columnheader">
			{translate(retrigger ? 'BONUS_INFO_ADDITIONAL_SPINS' : 'BONUS_INFO_FREE_SPINS_COLUMN')}
		</span>
	</div>
	{#each rows as row}
		<div class="award-row" role="row">
			<div role="cell"><strong>{row.symbolCount}</strong></div>
			<div role="cell"><strong>{retrigger ? '+' : ''}{row.awardedSpins}</strong></div>
		</div>
	{/each}
</div>

<style lang="scss">
	.award-table {
		overflow: hidden;
		border: 1px solid #594932;
		border-radius: 4px;
		background: rgba(12, 10, 9, 0.46);
	}

	.award-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.award-row + .award-row {
		border-top: 1px solid rgba(190, 157, 99, 0.2);
	}

	.award-row span {
		padding: 0.42rem 0.65rem;
		text-align: center;
	}

	.award-row div {
		padding: 0.42rem 0.65rem;
		text-align: center;
	}

	.award-row strong {
		color: #ffe394;
		font-size: 0.9rem;
	}

	.award-header {
		background: rgba(103, 81, 50, 0.42);
		color: #d9c9a7;
		font-size: 0.78rem;
	}
</style>
