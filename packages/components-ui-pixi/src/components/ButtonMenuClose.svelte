<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateUi } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';
	import {
		MENU_OPTION_BUTTON_SIZES,
		MENU_OPTION_TEXT_MAX_WIDTH,
		MENU_OPTION_TEXT_STYLE,
	} from '../constants';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = MENU_OPTION_BUTTON_SIZES;

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
	assetKey="uiMenuOptionButtonBg"
	textStyle={MENU_OPTION_TEXT_STYLE}
	textMaxWidth={MENU_OPTION_TEXT_MAX_WIDTH}
/>
