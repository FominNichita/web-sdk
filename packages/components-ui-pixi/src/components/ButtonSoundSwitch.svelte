<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateSound } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import {
		MENU_OPTION_BUTTON_SIZES,
		MENU_OPTION_TEXT_MAX_WIDTH,
		MENU_OPTION_TEXT_STYLE,
	} from '../constants';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = MENU_OPTION_BUTTON_SIZES;

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (stateSound.volumeValueMaster === 0) {
			stateSound.volumeValueMaster = 50;
		} else {
			stateSound.volumeValueMaster = 0;
		}
	};
</script>

<UiButton
	{...props}
	{sizes}
	{onpress}
	icon={stateSound.volumeValueMaster > 0 ? 'soundOn' : 'soundOff'}
	assetKey="uiMenuOptionButtonBg"
	textStyle={MENU_OPTION_TEXT_STYLE}
	textMaxWidth={MENU_OPTION_TEXT_MAX_WIDTH}
/>
