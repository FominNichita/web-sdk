<script lang="ts">
	import {
		BASE_FREE_SPINS,
		GAME_FACTS,
		PAYLINES,
		PAYTABLE_SYMBOLS,
		RETRIGGER_FREE_SPINS,
		SCATTER_SYMBOL,
		WILD_MULTIPLIERS,
	} from '../game/paytable';
	import { VISIBLE_BONUS_INFO_ENTRIES } from '../game/bonusInfo';
	import BonusInfoList from './BonusInfoList.svelte';

	type Tab = 'paytable' | 'features' | 'bonuses' | 'paylines';
	type Props = {
		initialTab: Tab;
	};

	const props: Props = $props();
	let activeTab = $state<Tab>(props.initialTab);

	const tabs: readonly { id: Tab; label: string }[] = [
		{ id: 'paytable', label: 'Paytable' },
		{ id: 'features', label: 'Features & Rules' },
		{ id: 'bonuses', label: 'Bonuses' },
		{ id: 'paylines', label: 'Paylines' },
	];

	const payout = (value: number) => `${value}`;
	const paylinePoints = (line: (typeof PAYLINES)[number]) =>
		line.map((row, reel) => `${10 + reel * 20},${10 + row * 20}`).join(' ');
</script>

<section class="paytable-modal" aria-label="Paytable and game rules">
	<header class="header">
		<h1>GAME INFO</h1>
		<p>{GAME_FACTS.reels} reels · {GAME_FACTS.rows} rows · {GAME_FACTS.paylines} fixed paylines</p>
	</header>

	<nav class="tabs" aria-label="Game information">
		{#each tabs as tab}
			<button
				type="button"
				class:active={activeTab === tab.id}
				aria-pressed={activeTab === tab.id}
				onclick={() => (activeTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</nav>

	<div class="body">
		{#if activeTab === 'paytable'}
			<div class="symbol-grid">
				{#each PAYTABLE_SYMBOLS as symbol}
					<article class="symbol-card">
						<img src={symbol.image} alt={symbol.name} draggable="false" />
						<h2>{symbol.name}</h2>
						<div class="payouts">
							<span>5× = {payout(symbol.payouts[0])}</span>
							<span>4× = {payout(symbol.payouts[1])}</span>
							<span>3× = {payout(symbol.payouts[2])}</span>
						</div>
					</article>
				{/each}
			</div>

			<article class="scatter-card">
				<img src={SCATTER_SYMBOL.image} alt={SCATTER_SYMBOL.name} draggable="false" />
				<div>
					<h2>{SCATTER_SYMBOL.name}</h2>
					<p>
						Scatter awards Free Spins and does not have a line payout or need to follow a payline.
					</p>
				</div>
			</article>

			<p class="bet-note">All displayed values multiply the selected total bet.</p>
		{:else if activeTab === 'features'}
			<div class="rules-grid">
				<article>
					<h2>Line Wins</h2>
					<p>
						Match 3, 4, or 5 identical paying symbols on consecutive reels, beginning on the
						leftmost reel and following one of the 20 fixed paylines.
					</p>
					<p>Several paylines may win on the same spin. All valid line wins are added together.</p>
				</article>

				<article>
					<h2>Cherry Wild</h2>
					<p>
						Wild substitutes for the regular dragon-stone, suit, and ring symbols. It also has its
						own payouts.
					</p>
					<p>
						If leading Wilds could form either a Wild win or another symbol's win, the higher valid
						base payout is used.
					</p>
				</article>

				<article>
					<h2>Multiplier Wilds</h2>
					<p>
						During Free Spins, Wilds may carry
						{WILD_MULTIPLIERS.map((value) => `${value}×`).join(', ')}.
					</p>
					<p>
						Multiplier values on Wilds participating in the same winning line are added together.
						Only Wilds in that line's winning positions contribute.
					</p>
				</article>

				<article>
					<h2>Free Spins</h2>
					<div class="award-columns">
						<div>
							<h3>Base Game</h3>
							{#each BASE_FREE_SPINS as award}
								<span>{award.scatters} Scatters = {award.spins} spins</span>
							{/each}
						</div>
						<div>
							<h3>Retrigger</h3>
							{#each RETRIGGER_FREE_SPINS as award}
								<span>{award.scatters} Scatters = +{award.spins} spins</span>
							{/each}
						</div>
					</div>
				</article>

				<article>
					<h2>Game Facts</h2>
					<p>RTP: {GAME_FACTS.rtp.toFixed(2)}%</p>
					<p>Maximum win: {GAME_FACTS.maxWin}× total bet</p>
					<p>Base game cost: {GAME_FACTS.baseCost}× · Bonus Buy cost: {GAME_FACTS.bonusCost}×</p>
				</article>
			</div>
		{:else if activeTab === 'bonuses'}
			<BonusInfoList entries={VISIBLE_BONUS_INFO_ENTRIES} />
		{:else}
			<p class="payline-intro">Wins follow the highlighted path from the first reel on the left.</p>
			<div class="payline-grid">
				{#each PAYLINES as line, index}
					<article class="payline-card">
						<h2>Line {index + 1}</h2>
						<div class="payline-diagram" aria-label={`Payline ${index + 1}`}>
							<div class="payline-cells">
								{#each Array(15) as _, cellIndex}
									{@const reel = cellIndex % 5}
									{@const row = Math.floor(cellIndex / 5)}
									<span class:active={line[reel] === row}></span>
								{/each}
							</div>
							<svg viewBox="0 0 100 60" aria-hidden="true">
								<polyline points={paylinePoints(line)} />
							</svg>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.paytable-modal {
		width: min(74rem, 94vw);
		height: min(88vh, 54rem);
		box-sizing: border-box;
		display: grid;
		grid-template-rows: auto auto minmax(0, 1fr);
		overflow: hidden;
		border: 2px solid #675132;
		border-radius: 6px;
		background:
			linear-gradient(rgba(19, 15, 13, 0.96), rgba(8, 7, 7, 0.98)),
			radial-gradient(circle at top, #4d3218, #080707 68%);
		box-shadow:
			0 0 0 2px #17100a,
			0 18px 60px rgba(0, 0, 0, 0.75);
		color: #f4ead8;
		font-family: 'KleeOne-SemiBold', serif;
	}

	.header {
		padding: 1rem 4rem 0.65rem;
		text-align: center;
		border-bottom: 1px solid rgba(210, 167, 88, 0.28);
	}

	.header h1 {
		margin: 0;
		color: #f4c55b;
		font-family: Sancreek, serif;
		font-size: clamp(1.8rem, 4vw, 3rem);
		line-height: 1;
		text-shadow: 0 2px #000;
	}

	.header p,
	.bet-note,
	.payline-intro {
		margin: 0.35rem 0 0;
		color: #cbbd9f;
		font-size: 0.84rem;
	}

	.tabs {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.35rem;
		padding: 0.55rem 0.75rem;
		background: rgba(0, 0, 0, 0.32);
	}

	.tabs button {
		min-height: 2.5rem;
		border: 1px solid #594932;
		border-radius: 3px;
		background: #292522;
		color: #d9cfbb;
		font-family: Sancreek, serif;
		font-size: clamp(0.82rem, 2vw, 1.05rem);
		cursor: pointer;
	}

	.tabs button.active {
		border-color: #e3b54c;
		background: #574226;
		color: #ffe394;
		box-shadow: inset 0 0 12px rgba(241, 182, 61, 0.26);
	}

	.body {
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 0.85rem;
		scrollbar-color: #8b6936 #171411;
	}

	.symbol-grid {
		display: grid;
		grid-template-columns: repeat(5, minmax(8rem, 1fr));
		gap: 0.65rem;
	}

	.symbol-card,
	.scatter-card,
	.rules-grid article,
	.payline-card {
		border: 1px solid #4f4334;
		border-radius: 5px;
		background: rgba(42, 36, 31, 0.78);
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.04);
	}

	.symbol-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.55rem;
	}

	.symbol-card img {
		width: min(100%, 8.75rem);
		aspect-ratio: 1;
		object-fit: contain;
	}

	.symbol-card h2,
	.scatter-card h2,
	.rules-grid h2,
	.payline-card h2 {
		margin: 0.2rem 0 0.35rem;
		color: #f0c76a;
		font-family: Sancreek, serif;
		font-size: 0.92rem;
		font-weight: 400;
		text-align: center;
	}

	.payouts {
		display: grid;
		gap: 0.08rem;
		width: 100%;
		color: #fff9e9;
		font-size: 0.8rem;
		text-align: center;
	}

	.scatter-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 0.7rem;
		padding: 0.65rem 1rem;
	}

	.scatter-card img {
		width: 6rem;
		height: 6rem;
		object-fit: contain;
		flex: 0 0 auto;
	}

	.scatter-card p,
	.rules-grid p {
		margin: 0.25rem 0;
		font-size: 0.84rem;
		line-height: 1.45;
	}

	.bet-note,
	.payline-intro {
		text-align: center;
	}

	.rules-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.rules-grid article {
		padding: 0.85rem 1rem;
	}

	.rules-grid article:last-child {
		grid-column: 1 / -1;
	}

	.rules-grid h2 {
		text-align: left;
		font-size: 1.05rem;
	}

	.award-columns {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.award-columns div {
		display: grid;
		gap: 0.18rem;
	}

	.award-columns h3 {
		margin: 0;
		color: #d9c9a7;
		font-size: 0.82rem;
	}

	.award-columns span {
		font-size: 0.8rem;
	}

	.payline-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(9rem, 1fr));
		gap: 0.65rem;
		margin-top: 0.65rem;
	}

	.payline-card {
		padding: 0.45rem;
	}

	.payline-card h2 {
		margin-top: 0;
	}

	.payline-diagram {
		position: relative;
		aspect-ratio: 5 / 3;
	}

	.payline-cells {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 2px;
	}

	.payline-cells span {
		border: 1px solid #463b30;
		background: #171512;
	}

	.payline-cells span.active {
		background: #7a551d;
		box-shadow: inset 0 0 8px #f2c45c;
	}

	.payline-diagram svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.payline-diagram polyline {
		fill: none;
		stroke: #ffe07a;
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
		filter: drop-shadow(0 0 2px #000);
	}

	@media (max-width: 850px) {
		.symbol-grid {
			grid-template-columns: repeat(3, minmax(7rem, 1fr));
		}

		.payline-grid {
			grid-template-columns: repeat(3, minmax(8rem, 1fr));
		}
	}

	@media (max-width: 560px) {
		.paytable-modal {
			width: 96vw;
			height: 91vh;
		}

		.header {
			padding-inline: 3rem;
		}

		.header p {
			display: none;
		}

		.tabs {
			padding-inline: 0.4rem;
		}

		.symbol-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.scatter-card {
			align-items: flex-start;
		}

		.scatter-card img {
			width: 4.5rem;
			height: 4.5rem;
		}

		.rules-grid,
		.award-columns {
			grid-template-columns: 1fr;
		}

		.rules-grid article:last-child {
			grid-column: auto;
		}

		.payline-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
