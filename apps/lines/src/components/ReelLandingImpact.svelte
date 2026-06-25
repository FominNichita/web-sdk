<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { Graphics } from 'pixi-svelte';

	import { BOARD_DIMENSIONS, SYMBOL_SIZE } from '../game/constants';
	import { getSymbolX, getSymbolY } from '../game/utils';
	import type { RawSymbol } from '../game/types';

	type Props = {
		reelIndex: number;
		symbols: RawSymbol[];
		oncomplete: () => void;
	};

	const props: Props = $props();
	const progress = new Tween(0);
	const dustOffsets = [-42, -25, -8, 11, 29, 44] as const;
	const symbolWeight = (symbol?: RawSymbol) => {
		if (!symbol) return 1;
		if (symbol.name === 'W') return 1.65;
		if (symbol.name.startsWith('H')) return 1.4;
		if (symbol.name === 'S') return 1.25;
		return 0.82;
	};

	onMount(async () => {
		await progress.set(1, { duration: 340, easing: cubicOut });
		props.oncomplete();
	});
</script>

<Graphics
	draw={(graphics) => {
		const x = getSymbolX(props.reelIndex);
		const fade = 1 - progress.current;

		for (let row = 0; row < BOARD_DIMENSIONS.y; row += 1) {
			const y = getSymbolY(row);
			const weight = symbolWeight(props.symbols[row + 1]);
			const flashScale = 0.86 + progress.current * 0.14;
			const size = SYMBOL_SIZE * flashScale;

			graphics.roundRect(x - size / 2, y - size / 2, size, size, 7);
			graphics.fill({ color: 0xffd86a, alpha: fade * 0.12 });
			graphics.roundRect(x - size / 2 + 4, y - size / 2 + 4, size - 8, size - 8, 6);
			graphics.stroke({ width: 2.5, color: 0xffd86a, alpha: fade * 0.5 });

			for (const [index, offset] of dustOffsets.entries()) {
				const drift =
					(index % 2 === 0 ? -1 : 1) * progress.current * (5 + index) * weight;
				const radius = Math.max(1, (4 - index * 0.35) * fade * weight);
				graphics.circle(
					x + offset + drift,
					y + SYMBOL_SIZE * 0.42 - progress.current * (18 + index * 3) * weight,
					radius,
				);
				graphics.fill({
					color: index % 2 === 0 ? 0xc89a50 : 0x76502b,
					alpha: Math.min(0.72, fade * 0.5 * weight),
				});
			}
		}

		const sweepX = x - SYMBOL_SIZE * 0.5 + progress.current * SYMBOL_SIZE;
		for (let band = 0; band < 4; band += 1) {
			const bandOffset = (band - 1.5) * 5;
			graphics.rect(
				sweepX + bandOffset,
				0,
				4,
				SYMBOL_SIZE * BOARD_DIMENSIONS.y,
			);
			graphics.fill({
				color: 0xffe29a,
				alpha: fade * (0.12 - Math.abs(band - 1.5) * 0.025),
			});
		}
	}}
/>
