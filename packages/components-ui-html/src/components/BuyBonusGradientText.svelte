<script lang="ts">
	type Props = {
		text: string;
		fontSize: number;
		viewBoxWidth: number;
		viewBoxHeight: number;
		maxWidth?: number;
		strokeWidth?: number;
		centerYRatio?: number;
	};

	const {
		text,
		fontSize,
		viewBoxWidth,
		viewBoxHeight,
		maxWidth,
		strokeWidth = 3,
		centerYRatio = 0.54,
	}: Props = $props();

	const gradientId = `silverTextGradient-${Math.random().toString(36).slice(2)}`;
	let textElement = $state<SVGTextElement>();
	let measuredTextWidth = $state(0);
	const textScale = $derived(
		maxWidth && measuredTextWidth > 0 ? Math.min(1, maxWidth / measuredTextWidth) : 1,
	);

	$effect(() => {
		text;
		fontSize;
		textElement;

		if (!textElement) return;
		measuredTextWidth = textElement.getBBox().width;
	});
</script>

<svg
	class="silver-text"
	viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
	width="100%"
	height="100%"
	aria-hidden="true"
	focusable="false"
>
	<defs>
		<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="#B6B7B9" />
			<stop offset="32.5%" stop-color="#FDFDFD" />
			<stop offset="65%" stop-color="#9CA0A1" />
			<stop offset="84.5%" stop-color="#AAABAD" />
			<stop offset="100%" stop-color="#666666" />
		</linearGradient>
	</defs>

	<text
		bind:this={textElement}
		x="50%"
		y={`${centerYRatio * 100}%`}
		text-anchor="middle"
		dominant-baseline="middle"
		transform="translate({viewBoxWidth * 0.5} {viewBoxHeight *
			centerYRatio}) scale({textScale}) translate({-viewBoxWidth * 0.5} {-viewBoxHeight *
			centerYRatio})"
		font-family="Sancreek"
		font-size={fontSize}
		fill="url(#{gradientId})"
		stroke="#000000"
		stroke-width={strokeWidth}
		paint-order="stroke fill"
	>
		{text}
	</text>
</svg>

<style lang="scss">
	.silver-text {
		display: block;
		overflow: visible;
		pointer-events: none;
	}
</style>
