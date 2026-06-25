<script lang="ts">
	import { Graphics } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import {
		BOARD_DIMENSIONS,
		PORTRAIT_BOARD_OFFSET_X,
		PORTRAIT_BOARD_SCALE,
		SYMBOL_SIZE,
	} from '../game/constants';

	const context = getContext();

	const boardScale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_SCALE : 1,
	);
	const boardOffsetX = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_OFFSET_X : 0,
	);
	const anticipatingReels = $derived(
		context.stateGame.board
			.filter(
				(reel) =>
					reel.reelState.anticipating &&
					reel.reelState.motion !== 'stopped',
			)
			.map((reel) => reel.reelIndex),
	);
	const boardLeft = $derived(
		context.stateGameDerived.boardLayout().x -
			(context.stateGameDerived.boardLayout().width * boardScale) / 2 +
			boardOffsetX,
	);
	const boardTop = $derived(
		context.stateGameDerived.boardLayout().y -
			(context.stateGameDerived.boardLayout().height * boardScale) / 2,
	);
	const reelWidth = $derived(SYMBOL_SIZE * boardScale);
	const boardHeight = $derived(SYMBOL_SIZE * BOARD_DIMENSIONS.y * boardScale);
</script>

<Graphics
	draw={(graphics) => {
		if (anticipatingReels.length === 0) return;

		for (const reel of context.stateGame.board) {
			const x = boardLeft + reel.reelIndex * reelWidth;

			if (!anticipatingReels.includes(reel.reelIndex)) {
				graphics.rect(x, boardTop, reelWidth, boardHeight);
				graphics.fill({ color: 0x080502, alpha: 0.22 });
			}
		}
	}}
/>
