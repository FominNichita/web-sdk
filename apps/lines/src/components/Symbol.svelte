<script lang="ts">
	import SymbolSpine from './SymbolSpine.svelte';
	import SymbolSprite from './SymbolSprite.svelte';
	import { getSymbolInfo } from '../game/utils';
	import type { SymbolState, RawSymbol } from '../game/types';
	import { getContext } from '../game/context';
	import { Tween } from 'svelte/motion';
	import { BitmapText, Container } from 'pixi-svelte';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		rawSymbol: RawSymbol;
		oncomplete?: () => void;
		loop?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const symbolInfo = $derived(getSymbolInfo({ rawSymbol: props.rawSymbol, state: props.state }));
	const isSprite = $derived(symbolInfo.type === 'sprite');
	const multiplierReveal = new Tween(1);
	const multiplierAlpha = new Tween(1);
	const multiplierRotation = new Tween(0);
	let multiplierRunId = 0;

	$effect(() => {
		props.state;
		props.rawSymbol.multiplier;
		multiplierRunId += 1;
		const runId = multiplierRunId;

		if (
			!props.rawSymbol.multiplier ||
			(props.state !== 'land' && props.state !== 'win')
		) {
			void multiplierReveal.set(1, { duration: 0 });
			void multiplierAlpha.set(1, { duration: 0 });
			void multiplierRotation.set(0, { duration: 0 });
			return;
		}

		void (async () => {
			const winningMultiplier = props.state === 'win';
			await Promise.all([
				multiplierReveal.set(winningMultiplier ? 1 : 0.3, { duration: 0 }),
				multiplierAlpha.set(winningMultiplier ? 1 : 0, { duration: 0 }),
				multiplierRotation.set(winningMultiplier ? 0 : -0.12, { duration: 0 }),
			]);
			await Promise.all([
				multiplierReveal.set(winningMultiplier ? 1.28 : 1.18, { duration: 190 }),
				multiplierAlpha.set(1, { duration: 130 }),
				multiplierRotation.set(winningMultiplier ? -0.04 : 0.05, { duration: 190 }),
			]);
			if (runId !== multiplierRunId) return;
			await Promise.all([
				multiplierReveal.set(1, { duration: 140 }),
				multiplierRotation.set(0, { duration: 140 }),
			]);
		})();
	});
</script>

{#if isSprite}
	<SymbolSprite
		{symbolInfo}
		rawSymbol={props.rawSymbol}
		state={props.state}
		x={props.x}
		y={props.y}
		oncomplete={props.oncomplete}
	/>
{:else}
	<SymbolSpine
		loop={props.loop}
		{symbolInfo}
		x={props.x}
		y={props.y}
		showWinFrame={props.state === 'win' && !['S', 'M'].includes(props.rawSymbol.name)}
		listener={{
			complete: props.oncomplete,
			event: (_, event) => {
				if (event.data?.name === 'wildExplode') {
					context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_wild_explode' });
				}
			},
		}}
	/>
{/if}

{#if props.rawSymbol.multiplier}
	<Container
		x={props.x}
		y={props.y}
		scale={multiplierReveal.current}
		alpha={multiplierAlpha.current}
		rotation={multiplierRotation.current}
	>
		<BitmapText
			anchor={0.5}
			text={`${props.rawSymbol.multiplier}X`}
			style={{
				fontFamily: 'gold',
				fontSize: 50,
			}}
		/>
	</Container>
{/if}
