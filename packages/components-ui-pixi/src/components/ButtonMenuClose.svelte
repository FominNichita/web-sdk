<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateUi } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const targetCssSize = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? 42 : 34,
	);
	const logicalSize = $derived(
		targetCssSize / context.stateLayoutDerived.mainLayoutStandard().scale,
	);
	const sizes = $derived({ width: logicalSize, height: logicalSize });

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = false;
	};
</script>

<UiButton
	{...props}
	{sizes}
	{onpress}
	icon="menuExit"
	assetKey="uiButtonExit"
	hideText
/>
