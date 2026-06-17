<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: 136, height: 60 };
	const textStyle = { fontFamily: 'Sancreek', fill: '#111111' };
	let selected = $state(stateBet.isTurbo);
	const active = $derived(selected);
	const assetKey = $derived(active ? 'uiWinBg' : 'uiButtonFooterBg');
	const disabled = $derived(stateBet.isSpaceHold);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		selected = !selected;
		stateBetDerived.updateIsTurbo(selected, { persistent: true });
	};

	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => stateBetDerived.updateIsTurbo(true, { persistent: false }),
		stopButtonEnable: () => stateBetDerived.updateIsTurbo(false, { persistent: false }),
	});
</script>

<UiButton
	{...props}
	{sizes}
	{active}
	{onpress}
	{disabled}
	icon="turbo"
	{assetKey}
	{textStyle}
/>
