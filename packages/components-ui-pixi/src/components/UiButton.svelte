<script lang="ts">
	import { Container, Text, type SpriteProps, type TextProps } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';

	import UiSprite from './UiSprite.svelte';
	import type { ButtonIcon } from '../types';
	import type { Snippet } from 'svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = Omit<ButtonProps, 'children'> & {
		icon: ButtonIcon;
		sizes: { width: number; height: number };
		assetKey?: SpriteProps['key'];
		pressedAssetKey?: SpriteProps['key'];
		active?: boolean;
		children?: Snippet;
		hideText?: boolean;
		label?: string;
		textMaxWidth?: number;
		textStyle?: TextProps['style'];
		variant?: 'dark' | 'light';
		dimDisabled?: boolean;
		activeTint?: SpriteProps['tint'];
	};

	const {
		assetKey,
		pressedAssetKey,
		icon,
		active,
		hideText,
		label,
		textMaxWidth,
		textStyle,
		variant = 'dark',
		dimDisabled = true,
		activeTint,
		children: childrenFromParent,
		...buttonProps
	}: Props = $props();

	const text = $derived(label ?? i18nDerived[icon]());
	const maxTextWidth = $derived(textMaxWidth ?? buttonProps.sizes.width * 0.72);
	const maxTextHeight = $derived(buttonProps.sizes.height * 0.62);
	let textWidth = $state(0);
	let textHeight = $state(0);
	const textScale = $derived.by(() => {
		if (!textWidth || !textHeight) return 1;

		return Math.min(1, maxTextWidth / textWidth, maxTextHeight / textHeight);
	});

	const buttonTextStyle = $derived({
		align: 'center',
		wordWrap: true,
		wordWrapWidth: maxTextWidth,
		fontFamily: 'proxima-nova',
		fontWeight: '600',
		fontSize: Math.min(UI_BASE_FONT_SIZE * 0.75, buttonProps.sizes.height * 0.34),
		fill: variant === 'dark' ? 0xffffff : 0x000000,
		...textStyle,
	});
</script>

<Button {...buttonProps}>
	{#snippet children({ center, pressed })}
		<UiSprite
			{...center}
			anchor={0.5}
			assetKey={pressed && pressedAssetKey ? pressedAssetKey : assetKey}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			tint={buttonProps.disabled && dimDisabled && assetKey
				? 0x999999
				: active && activeTint !== undefined
					? activeTint
					: 0xffffff}
			backgroundColor={variant === 'dark' ? 0x000000 : 0xffffff}
			{...buttonProps.disabled
				? {
						backgroundColor: 0xaaaaaa,
					}
				: {}}
			{...active
				? {
						borderWidth: 10,
						borderColor: variant === 'dark' ? 0xffffff : 0x000000,
					}
				: {}}
		/>

		{#if !hideText}
			<Container {...center} scale={textScale}>
				<Text
					anchor={0.5}
					{text}
					style={buttonTextStyle}
					onresize={({ width, height }) => {
						textWidth = width;
						textHeight = height;
					}}
				/>
			</Container>
		{/if}

		{@render childrenFromParent?.()}
	{/snippet}
</Button>
