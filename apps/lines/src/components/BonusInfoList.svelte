<script lang="ts">
	import type { BonusInfoEntry } from '../game/bonusInfo';

	type Props = {
		entries: readonly BonusInfoEntry[];
	};

	const props: Props = $props();

	const formatPercent = (value: number) => value.toFixed(2);
	const formatNumber = (value: number) => value.toLocaleString('en-US');
	const multiplierList = (entry: BonusInfoEntry) =>
		entry.multiplierWild?.values.map((value) => `${value}×`).join(', ');
</script>

<div class="bonus-list">
	{#each props.entries as entry, index}
		<details class="bonus-entry" open={index === 0}>
			<summary>
				<span>
					<strong>{entry.title}</strong>
					<small>{entry.summary}</small>
				</span>
				<span class="expand-icon" aria-hidden="true"></span>
			</summary>

			<div class="bonus-details">
				{#each entry.description as paragraph}
					<p>{paragraph}</p>
				{/each}

				<div class="value-grid">
					{#if entry.purchase}
						<div>
							<span>Cost</span>
							<strong>{entry.purchase.costMultiplier}× selected bet</strong>
						</div>
					{/if}
					<div>
						<span>Theoretical RTP</span>
						<strong>{formatPercent(entry.rtpPercent)}%</strong>
					</div>
					<div>
						<span>Maximum Win</span>
						<strong>{formatNumber(entry.maxWinMultiplier)}× selected bet</strong>
					</div>
				</div>

				<section>
					<h3>Initial Free Spins</h3>
					<div class="award-table">
						<span>Scatters</span>
						<span>Free Spins</span>
						{#each entry.triggerTable as award}
							<strong>{award.symbolCount}</strong>
							<strong>{award.awardedSpins}</strong>
						{/each}
					</div>
				</section>

				{#if entry.multiplierWild}
					<section>
						<h3>Multiplier Wilds</h3>
						<p>Possible values: {multiplierList(entry)}</p>
						<p>
							A 3× Wild and a 10× Wild on the same winning line combine to give a 13× line
							multiplier. Their values are added, not multiplied.
						</p>
					</section>
				{/if}

				{#if entry.retriggerTable}
					<section>
						<h3>Retriggers</h3>
						<div class="award-table">
							<span>Scatters</span>
							<span>Extra Spins</span>
							{#each entry.retriggerTable as award}
								<strong>{award.symbolCount}</strong>
								<strong>+{award.awardedSpins}</strong>
							{/each}
						</div>
					</section>
				{/if}

				{#if entry.rtpNote}
					<p class="rtp-note">{entry.rtpNote}</p>
				{/if}

				<ul>
					{#each entry.rules as rule}
						<li>{rule}</li>
					{/each}
				</ul>
			</div>
		</details>
	{/each}
</div>

<style lang="scss">
	.bonus-list {
		display: grid;
		gap: 0.75rem;
	}

	.bonus-entry {
		border: 1px solid #594a36;
		border-radius: 5px;
		background: rgba(42, 36, 31, 0.82);
		overflow: hidden;
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.9rem 1rem;
		cursor: pointer;
		list-style: none;
		background: rgba(83, 63, 35, 0.45);
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary span:first-child {
		display: grid;
		gap: 0.16rem;
	}

	summary strong,
	h3 {
		color: #f0c76a;
		font-family: Sancreek, serif;
		font-weight: 400;
	}

	summary strong {
		font-size: 1.1rem;
	}

	summary small {
		color: #d8ccb5;
		font-size: 0.8rem;
	}

	.expand-icon::before {
		content: '+';
		display: block;
		color: #f0c76a;
		font-size: 1.4rem;
	}

	details[open] .expand-icon::before {
		content: '−';
	}

	.bonus-details {
		display: grid;
		gap: 0.75rem;
		padding: 0.9rem 1rem 1rem;
	}

	p {
		margin: 0;
		font-size: 0.84rem;
		line-height: 1.48;
	}

	.value-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.5rem;
	}

	.value-grid div {
		display: grid;
		gap: 0.2rem;
		padding: 0.65rem;
		border: 1px solid #6e5734;
		background: #1c1916;
		text-align: center;
	}

	.value-grid span {
		color: #bcae93;
		font-size: 0.68rem;
		text-transform: uppercase;
	}

	.value-grid strong {
		color: #fff1bc;
		font-size: 0.9rem;
	}

	section {
		display: grid;
		gap: 0.4rem;
	}

	h3 {
		margin: 0;
		font-size: 0.92rem;
	}

	.award-table {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border: 1px solid #4d4235;
		background: #181613;
		text-align: center;
	}

	.award-table > * {
		padding: 0.38rem;
		border-bottom: 1px solid #342e27;
	}

	.award-table span {
		color: #bcae93;
		font-size: 0.72rem;
	}

	.award-table strong {
		color: #fff1bc;
		font-size: 0.82rem;
	}

	.rtp-note {
		padding: 0.65rem;
		border-left: 3px solid #d6a945;
		background: rgba(0, 0, 0, 0.25);
		color: #d9ceb8;
	}

	ul {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		padding-left: 1.2rem;
		font-size: 0.8rem;
		line-height: 1.4;
	}

	@media (max-width: 560px) {
		.value-grid {
			grid-template-columns: 1fr;
		}

		summary {
			padding-inline: 0.75rem;
		}

		.bonus-details {
			padding-inline: 0.75rem;
		}
	}
</style>
