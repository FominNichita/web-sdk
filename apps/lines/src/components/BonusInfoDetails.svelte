<script lang="ts">
	import { stateI18nDerived } from 'state-shared';

	import type { BonusInfoEntry } from '../game/bonusInfo';
	import BonusInfoTable from './BonusInfoTable.svelte';

	type Props = { entry: BonusInfoEntry };

	const { entry }: Props = $props();
	const translate = (key: string) => stateI18nDerived.translate(key);
	const formatMultiplier = (value: number) => `${value.toLocaleString('en-US')}×`;
	const translateWithValues = (key: string, values: Record<string, string>) =>
		Object.entries(values).reduce(
			(message, [name, value]) => message.replaceAll(`{{${name}}}`, value),
			translate(key),
		);
</script>

<div class="bonus-details">
	<section>
		<h3>{translate('BONUS_INFO_HOW_TO_TRIGGER')}</h3>
		<div class="entry-methods">
			{#each entry.entryMethods as method}
				<article>
					<h4>{translate(method.titleKey)}</h4>
					<p>
						{translateWithValues(method.descriptionKey, {
							costMultiplier: formatMultiplier(entry.purchase?.costMultiplier ?? 0),
						})}
					</p>
				</article>
			{/each}
		</div>
		{#if entry.triggerTable}
			<BonusInfoTable rows={entry.triggerTable} />
		{/if}
	</section>

	{#if entry.multiplierWild}
		<section>
			<h3>{translate('BONUS_INFO_DURING_FREE_SPINS')}</h3>
			<div class="multiplier-list" aria-label={translate('BONUS_INFO_MULTIPLIER_VALUES')}>
				{#each entry.multiplierWild.values as value}
					<strong>{formatMultiplier(value)}</strong>
				{/each}
			</div>
			<ul>
				{#each entry.mechanicsKeys as key}
					<li>{translate(key)}</li>
				{/each}
			</ul>
		</section>
	{/if}

	{#if entry.retriggerTable}
		<section>
			<h3>{translate('BONUS_INFO_RETRIGGERS')}</h3>
			<p>{translate('BONUS_INFO_RETRIGGER_DESCRIPTION')}</p>
			<BonusInfoTable rows={entry.retriggerTable} retrigger />
		</section>
	{/if}

	<section>
		<h3>{translate('BONUS_INFO_RTP_LIMITS')}</h3>
		<div class="facts">
			{#if entry.purchase}
				<div>
					<span>{translate('BONUS_INFO_BUY_COST')}</span>
					<strong>
						{formatMultiplier(entry.purchase.costMultiplier)}
						{translate('BONUS_INFO_SELECTED_BET')}
					</strong>
				</div>
			{/if}
			<div>
				<span>{translate('BONUS_INFO_RTP')}</span>
				<strong>{entry.rtpPercent.toFixed(2)}%</strong>
			</div>
			<div>
				<span>{translate('BONUS_INFO_MAX_WIN')}</span>
				<strong>
					{formatMultiplier(entry.maxWinMultiplier)}
					{translate('BONUS_INFO_SELECTED_BET')}
				</strong>
			</div>
		</div>
		<p>{translate('BONUS_INFO_RTP_EXPLANATION')}</p>
		<p>{translate('BONUS_INFO_MAX_WIN_EXPLANATION')}</p>
	</section>

	<section>
		<h3>{translate('BONUS_INFO_IMPORTANT_RULES')}</h3>
		<ul>
			{#each entry.ruleKeys as key}
				<li>{translate(key)}</li>
			{/each}
		</ul>
	</section>
</div>

<style lang="scss">
	.bonus-details {
		display: grid;
		gap: 0.75rem;
		padding: 0.75rem;
	}

	section,
	.entry-methods article {
		border: 1px solid #4f4334;
		border-radius: 5px;
		background: rgba(42, 36, 31, 0.78);
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.04);
	}

	section {
		padding: 0.8rem 0.9rem;
	}

	h3,
	h4 {
		margin: 0 0 0.45rem;
		color: #f0c76a;
		font-family: Sancreek, serif;
		font-weight: 400;
	}

	h3 {
		font-size: 1.05rem;
	}

	h4 {
		font-size: 0.92rem;
	}

	p,
	li {
		font-size: 0.84rem;
		line-height: 1.48;
	}

	p {
		margin: 0.35rem 0;
	}

	ul {
		margin: 0.4rem 0 0;
		padding-left: 1.15rem;
	}

	li + li {
		margin-top: 0.25rem;
	}

	.entry-methods {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.55rem;
		margin-bottom: 0.6rem;
	}

	.entry-methods article {
		padding: 0.65rem 0.75rem;
		background: rgba(15, 13, 11, 0.38);
	}

	.multiplier-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0.45rem 0 0.6rem;
	}

	.multiplier-list strong {
		min-width: 2.8rem;
		padding: 0.28rem 0.45rem;
		border: 1px solid #806532;
		border-radius: 3px;
		background: #241b11;
		color: #ffe394;
		text-align: center;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		gap: 0.5rem;
		margin: 0.3rem 0 0.7rem;
	}

	.facts div {
		display: grid;
		gap: 0.18rem;
		padding: 0.65rem;
		border: 1px solid #6e5630;
		border-radius: 4px;
		background: rgba(18, 14, 10, 0.64);
	}

	.facts span {
		color: #cbbd9f;
		font-size: 0.72rem;
		text-transform: uppercase;
	}

	.facts strong {
		color: #ffe394;
		font-size: 0.92rem;
	}

	@media (max-width: 560px) {
		.entry-methods,
		.facts {
			grid-template-columns: 1fr;
		}

		.bonus-details {
			padding-inline: 0;
		}
	}
</style>
