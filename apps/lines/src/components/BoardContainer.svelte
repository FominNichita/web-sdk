<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Container } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { PORTRAIT_BOARD_OFFSET_X, PORTRAIT_BOARD_SCALE } from '../game/constants';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();

	const context = getContext();
	const boardScale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_SCALE : 1,
	);
	const boardOffsetX = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_OFFSET_X : 0,
	);
</script>

<Container
	x={context.stateGameDerived.boardLayout().x + boardOffsetX}
	y={context.stateGameDerived.boardLayout().y}
	pivot={context.stateGameDerived.boardLayout().pivot}
	scale={boardScale}
>
	{@render props.children()}
</Container>
