<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Text, SpineProvider, SpineTrack, SpineSlot } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider, ResponsiveBitmapText } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import { getContext } from '../game/context';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import WinCoins from './WinCoins.svelte';

	type AnimationName = 'intro' | 'idle';

	const context = getContext();
	const panelScale = $derived(
		context.stateLayoutDerived.layoutType() === 'portrait' ? 1.25 : 1,
	);
	const WHITE_TEXT_STYLE = {
		fontFamily: 'KleeOne-SemiBold',
		fill: '#ffffff',
		stroke: { color: '#343434', width: 2 },
	};

	let show = $state(true);
	let animationName = $state<AnimationName>('intro');
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});
	let onCountUpComplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinOutroShow: () => (show = true),
		freeSpinOutroHide: async () => (show = false),
		freeSpinOutroCountUp: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const duration = winLevelData.presentDuration}
		{@const isBigWin = winLevelData.type === 'big'}
		<WinCountUpProvider {amount} {duration} oncomplete={() => onCountUpComplete()}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount onmount={() => startCountUp()} />

				<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

				<FreeSpinAnimation scale={panelScale}>
					{#snippet children({ sizes })}
						<Text
							x={0}
							y={sizes.height * -0.6 + 4}
							anchor={{ x: 0.5, y: 0.5 }}
							text="YOU WON"
							style={{
								...WHITE_TEXT_STYLE,
								fontSize: sizes.width * (isBigWin ? 0.1575 : 0.18),
								fill: '#000000',
							}}
						/>
						<Text
							x={0}
							y={sizes.height * -0.6}
							anchor={{ x: 0.5, y: 0.5 }}
							text="YOU WON"
							style={{
								...WHITE_TEXT_STYLE,
								fontSize: sizes.width * (isBigWin ? 0.1575 : 0.18),
							}}
						/>

						<SpineProvider key="fsOutroNumber" width={sizes.width * 0.4} y={sizes.height * -0.0625}>
							<SpineTrack
								trackIndex={0}
								{animationName}
								loop={animationName === 'idle'}
								listener={{
									complete: () => (animationName = 'idle'),
								}}
							/>
							<SpineSlot slotName="slot_number">
								<ResponsiveBitmapText
									anchor={0.5}
									style={{
										fontFamily: 'gold',
										fontSize: sizes.width * 0.1,
									}}
									text={bookEventAmountToCurrencyString(countUpAmount)}
									maxWidth={sizes.width}
								/>
							</SpineSlot>
						</SpineProvider>

						<Text
							x={0}
							y={sizes.height * 0.58 + 4}
							anchor={{ x: 0.5, y: 0.5 }}
							text="TOTAL WIN"
							style={{
								...WHITE_TEXT_STYLE,
								fontSize: sizes.width * (isBigWin ? 0.14625 : 0.16875),
								fill: '#000000',
							}}
						/>
						<Text
							x={0}
							y={sizes.height * 0.58}
							anchor={{ x: 0.5, y: 0.5 }}
							text="TOTAL WIN"
							style={{
								...WHITE_TEXT_STYLE,
								fontSize: sizes.width * (isBigWin ? 0.14625 : 0.16875),
							}}
						/>
					{/snippet}
				</FreeSpinAnimation>

				<WinCoins emit={!countUpCompleted} levelAlias={winLevelData?.alias} />

				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
