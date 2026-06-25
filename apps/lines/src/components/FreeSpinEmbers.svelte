<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Graphics } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import {
		PORTRAIT_BOARD_OFFSET_X,
		PORTRAIT_BOARD_SCALE,
		SYMBOL_SIZE,
	} from '../game/constants';

	const context = getContext();
	const emberCount = 18;
	const seeds = Array.from({ length: emberCount }, (_, index) => ({
		x: ((index * 47) % 101) / 100,
		y: ((index * 73) % 97) / 97,
		speed: 0.55 + ((index * 29) % 50) / 100,
		drift: 8 + ((index * 17) % 18),
		size: 1.5 + ((index * 11) % 18) / 10,
	}));

	let animationFrame = 0;
	let elapsed = $state(0);
	const boardScale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_SCALE : 1,
	);
	const boardOffsetX = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? PORTRAIT_BOARD_OFFSET_X : 0,
	);

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const startedAt = performance.now();

		const animate = (now: number) => {
			elapsed = reducedMotion ? 0 : (now - startedAt) / 1000;
			animationFrame = requestAnimationFrame(animate);
		};

		animationFrame = requestAnimationFrame(animate);
	});

	onDestroy(() => cancelAnimationFrame(animationFrame));
</script>

{#if context.stateGame.gameType === 'freegame'}
	<Graphics
		draw={(graphics) => {
			const board = context.stateGameDerived.boardLayout();
			const width = board.width * boardScale + SYMBOL_SIZE * 0.7;
			const height = board.height * boardScale + SYMBOL_SIZE * 0.8;
			const left = board.x + boardOffsetX - width / 2;
			const bottom = board.y + height / 2;

			for (const [index, ember] of seeds.entries()) {
				const cycle = (ember.y + elapsed * ember.speed * 0.16) % 1;
				const x =
					left +
					ember.x * width +
					Math.sin(elapsed * (0.7 + ember.speed) + index) * ember.drift;
				const y = bottom - cycle * height;
				const edgeFade = Math.sin(cycle * Math.PI);
				const flicker = 0.68 + Math.sin(elapsed * 5 + index * 1.7) * 0.22;
				const alpha = Math.max(0, edgeFade * flicker);

				graphics.circle(x, y, ember.size * 2.6);
				graphics.fill({ color: 0xff8a16, alpha: alpha * 0.12 });
				graphics.circle(x, y, ember.size);
				graphics.fill({
					color: index % 3 === 0 ? 0xfff0a3 : 0xffbd3c,
					alpha: alpha * 0.72,
				});
			}
		}}
	/>
{/if}
