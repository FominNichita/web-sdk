<script lang="ts" module>
	import type { Snippet } from 'svelte';

	import {
		Container,
		Rectangle,
		anchorToPivot,
		type ContainerProps,
		type Sizes,
		type PixiPoint,
	} from 'pixi-svelte';

	type ContainerPropsToOmit =
		| 'eventMode'
		| 'cursor'
		| 'pivot'
		| 'children'
		| 'onpointerover'
		| 'onpointerout'
		| 'onpointerdown'
		| 'onpointerup';

	export type Props = Omit<ContainerProps, ContainerPropsToOmit> & {
		sizes: Sizes;
		onpress: () => void;
		disabled?: boolean;
		anchor?: PixiPoint;
		minimumHitSize?: number;
		children: Snippet<
			[
				{
					center: { x: number; y: number };
					hovered: boolean;
					pressed: boolean;
				},
			]
		>;
		debug?: boolean;
	};
</script>

<script lang="ts">
	const {
		children,
		sizes,
		anchor,
		disabled,
		onpress,
		debug,
		minimumHitSize = 0,
		...containerProps
	}: Props = $props();
	const center = $derived({
		x: sizes.width * 0.5,
		y: sizes.height * 0.5,
	});

	let hovered = $state(false);
	let pressed = $state(false);

	$effect(() => {
		if (disabled) {
			hovered = false;
			pressed = false;
		}
	});
</script>

<Container
	{...containerProps}
	eventMode="static"
	cursor={disabled ? 'not-allowed' : 'pointer'}
	pivot={anchorToPivot({ sizes, anchor })}
	onpointerover={() => {
		if (disabled) return;
		hovered = true;
	}}
	onpointerout={() => {
		if (disabled) return;
		hovered = false;
	}}
	onpointerdown={() => {
		if (disabled) return;
		pressed = true;
	}}
	onpointerup={() => {
		if (disabled) return;
		pressed = false;
		onpress();
	}}
>
	{#if minimumHitSize > 0}
		<Rectangle
			x={(sizes.width - Math.max(sizes.width, minimumHitSize)) * 0.5}
			y={(sizes.height - Math.max(sizes.height, minimumHitSize)) * 0.5}
			width={Math.max(sizes.width, minimumHitSize)}
			height={Math.max(sizes.height, minimumHitSize)}
			alpha={0.001}
		/>
	{/if}
	{#if debug}
		<Rectangle
			width={sizes.width}
			height={sizes.height}
			alpha={0.5}
			borderWidth={2}
			borderColor={0xffffff}
		/>
	{/if}
	{@render children({ center, hovered, pressed })}
</Container>
