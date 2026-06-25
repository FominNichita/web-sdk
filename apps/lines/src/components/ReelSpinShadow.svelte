<script lang="ts">
	import { Graphics } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { BOARD_DIMENSIONS, SYMBOL_SIZE } from '../game/constants';
	import { getSymbolX } from '../game/utils';

	const context = getContext();
</script>

<Graphics
	draw={(graphics) => {
		for (const reel of context.stateGame.board) {
			if (reel.reelState.motion === 'stopped') continue;

			const left = getSymbolX(reel.reelIndex) - SYMBOL_SIZE / 2;
			graphics.rect(left, 0, SYMBOL_SIZE, SYMBOL_SIZE * BOARD_DIMENSIONS.y);
			graphics.fill({ color: 0x191612, alpha: 0.16 });
			graphics.rect(left + SYMBOL_SIZE * 0.12, 0, SYMBOL_SIZE * 0.76, SYMBOL_SIZE * BOARD_DIMENSIONS.y);
			graphics.fill({ color: 0x6e6960, alpha: 0.06 });
		}
	}}
/>
