<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { Graphics } from 'pixi-svelte';

	import { BOARD_DIMENSIONS, SYMBOL_SIZE } from '../game/constants';
	import { getSymbolX, getSymbolY } from '../game/utils';

	type Props = {
		reelIndex: number;
		oncomplete: () => void;
	};

	const props: Props = $props();
	const progress = new Tween(0);
	const dustOffsets = [-42, -25, -8, 11, 29, 44] as const;

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
			const flashScale = 0.86 + progress.current * 0.14;
			const size = SYMBOL_SIZE * flashScale;

			graphics.roundRect(x - size / 2, y - size / 2, size, size, 7);
			graphics.fill({ color: 0xffd86a, alpha: fade * 0.12 });
			graphics.roundRect(x - size / 2 + 4, y - size / 2 + 4, size - 8, size - 8, 6);
			graphics.stroke({ width: 2.5, color: 0xffd86a, alpha: fade * 0.5 });

			for (const [index, offset] of dustOffsets.entries()) {
				const drift = (index % 2 === 0 ? -1 : 1) * progress.current * (5 + index);
				const radius = Math.max(1, (4 - index * 0.35) * fade);
				graphics.circle(
					x + offset + drift,
					y + SYMBOL_SIZE * 0.42 - progress.current * (18 + index * 3),
					radius,
				);
				graphics.fill({
					color: index % 2 === 0 ? 0xc89a50 : 0x76502b,
					alpha: fade * 0.55,
				});
			}
		}
	}}
/>
