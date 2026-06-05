<script lang="ts">
	import { EnableSpaceHold } from 'components-shared';

	import UiFadeContainer from './UiFadeContainer.svelte';
	import LabelWin from './LabelWin.svelte';
	import LabelBet from './LabelBet.svelte';
	import ButtonPayTable from './ButtonPayTable.svelte';
	import ButtonGameRules from './ButtonGameRules.svelte';
	import ButtonSettings from './ButtonSettings.svelte';
	import ButtonTurbo from './ButtonTurbo.svelte';
	import ButtonMenu from './ButtonMenu.svelte';
	import ButtonMenuClose from './ButtonMenuClose.svelte';
	import ButtonSoundSwitch from './ButtonSoundSwitch.svelte';
	import { stateUi } from 'state-shared';
	import { BLACK } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle } from 'pixi-svelte';
	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';
	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import { MENU_OPTION_BUTTON_GAP, MENU_OPTION_BUTTON_SIZES } from '../constants';
	import SoundPanel from './SoundPanel.svelte';

	type Props = {
		gameName: LayoutUiProps['gameName'];
		logo: LayoutUiProps['logo'];
	};

	const props: Props = $props();
	const context = getContext();
	const MENU_OPTION_COUNT = 5;
	const MENU_OPTION_STACK_STEP = MENU_OPTION_BUTTON_SIZES.height + MENU_OPTION_BUTTON_GAP;
	const MENU_OPTION_STACK_START_Y = -(MENU_OPTION_STACK_STEP * (MENU_OPTION_COUNT - 1)) * 0.5;
</script>

<EnableSpaceHold />

<UiFadeContainer>
	<Container x={20}>
		{@render props.gameName()}
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
		{@render props.logo()}
	</Container>

	<MainContainer standard alignVertical="bottom">
		{#if stateUi.freeSpinCounterShow && ['portrait', 'tablet'].includes(context.stateLayoutDerived.layoutType())}
			<Container x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5} y={120}>
				<LabelFreeSpinCounter stacked />
			</Container>
		{/if}

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 270}
			scale={0.8}
		>
			<LabelWin stacked />
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 150}
			scale={0.8}
		>
			<LabelBet stacked />
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 270 - 15}
			scale={0.7}
		>
			<ButtonMenu />
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 150 - 15}
			scale={0.7}
		>
			<ButtonTurbo />
		</Container>
	</MainContainer>

	{#if stateUi.menuOpen}
		<Rectangle
			eventMode="static"
			cursor="pointer"
			alpha={0.5}
			anchor={0.5}
			backgroundColor={BLACK}
			width={context.stateLayoutDerived.canvasSizes().width}
			height={context.stateLayoutDerived.canvasSizes().height}
			x={context.stateLayoutDerived.canvasSizes().width * 0.5}
			y={context.stateLayoutDerived.canvasSizes().height * 0.5}
			onpointerup={() => {
				stateUi.soundPanelOpen = false;
				stateUi.menuOpen = false;
			}}
		/>

		<MainContainer standard>
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height * 0.5}
			>
				{#if stateUi.soundPanelOpen}
					<SoundPanel />
				{:else}
					<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 0}>
						<ButtonPayTable anchor={0.5} />
					</Container>

					<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 1}>
						<ButtonGameRules anchor={0.5} />
					</Container>

					<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 2}>
						<ButtonSettings anchor={0.5} />
					</Container>

					<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 3}>
						<ButtonSoundSwitch anchor={0.5} />
					</Container>

					<Container y={MENU_OPTION_STACK_START_Y + MENU_OPTION_STACK_STEP * 4}>
						<ButtonMenuClose anchor={0.5} />
					</Container>
				{/if}
			</Container>
		</MainContainer>
	{/if}
</UiFadeContainer>
