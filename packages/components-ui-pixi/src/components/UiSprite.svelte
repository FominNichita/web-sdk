<script lang="ts" module>
	import { Rectangle, Sprite, type RectangleProps, type SpriteProps } from 'pixi-svelte';

	export type Props = RectangleProps & {
		assetKey?: SpriteProps['key'];
		tint?: SpriteProps['tint'];
	};
</script>

<script lang="ts">
	const { assetKey, anchor, x, y, width, height, alpha, tint, ...rectangleProps }: Props = $props();
</script>

{#if assetKey}
	<Sprite key={assetKey} {anchor} {x} {y} {width} {height} {alpha} {tint} />
{:else}
	<Rectangle borderRadius={50} {anchor} {x} {y} {width} {height} {alpha} {...rectangleProps} />
{/if}

<!-- ADD YOUR DESIGN -->

<!-- <script lang="ts" module>
	import { Sprite, type SpriteProps } from 'pixi-svelte';
	import type { sharedAssetsPixi } from 'constants-shared/assets';

	export type Props = SpriteProps & {
		key: keyof typeof sharedAssetsPixi;
	};
</script>

<script lang="ts">
	const props: Props = $props();
</script>

<Sprite {...props} /> -->
