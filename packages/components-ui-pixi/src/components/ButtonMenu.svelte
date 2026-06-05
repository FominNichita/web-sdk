<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateUi } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: 116, height: 72 };
	const textStyle = {
		fontFamily: 'Sancreek',
		fill: '#E4C5AA',
		stroke: { color: '#000000', width: 3 },
	};

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateUi.menuOpen = true;
	};
</script>

<UiButton {...props} {sizes} {onpress} icon="menu" assetKey="uiButtonMenuBg" {textStyle} />
