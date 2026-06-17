<script lang="ts">
	type GearConfig = {
		src: string;
		x: number;
		y: number;
		width: number;
		duration: number;
		reverse?: boolean;
	};

	type RopeConfig = {
		src: string;
		x: number;
		y: number;
		width: number;
		duration: number;
		delay?: number;
		sway: number;
		twist: number;
		originX: number;
		originY: number;
	};

	const gearBaseUrl = '/assets/sprites/gears';

	// Tune these percentages against the background video.
	// x/y are the gear center positions inside a centered 16:9 stage; width is stage-relative.
	const gears: GearConfig[] = [
		{ src: `${gearBaseUrl}/1.png`, x: 80.8, y: 2.8, width: 15.2, duration: 21.6 },
		{ src: `${gearBaseUrl}/2.png`, x: 92.4, y: 23.7, width: 35.2, duration: 38.4, reverse: true },
		{ src: `${gearBaseUrl}/3.png`, x: 98.8, y: 62.4, width: 18.2, duration: 21.6, reverse: true },
		{ src: `${gearBaseUrl}/4.png`, x: 100.2, y: 93.9, width: 37, duration: 40.8 },
	];

	// Tune these percentages against the background video.
	// x/y are rope center positions; width is stage-relative.
	// sway = side movement, twist = rotation degrees, duration = wind cycle seconds.
	const ropes: RopeConfig[] = [
		{
			src: `${gearBaseUrl}/a.png`,
			x: 96,
			y: 17,
			width: 30,
			duration: 4.8,
			sway: 0.45,
			twist: 1.8,
			originX: 50,
			originY: 0,
		},
		{
			src: `${gearBaseUrl}/b.png`,
			x: 101,
			y: 92,
			width: 35.5,
			duration: 5.4,
			delay: -1.3,
			sway: 0.38,
			twist: 1.5,
			originX: 50,
			originY: 0,
		},
	];
</script>

<div class="background-gears" aria-hidden="true">
	<div class="gear-stage">
		{#each gears as gear}
			<div
				class="gear"
				style={`--gear-x: ${gear.x}; --gear-y: ${gear.y}; --gear-width: ${gear.width}; --gear-duration: ${gear.duration}s;`}
			>
				<img class:gear-image--reverse={gear.reverse} class="gear-image" src={gear.src} alt="" />
			</div>
		{/each}

		{#each ropes as rope}
			<div
				class="rope"
				style={`--rope-x: ${rope.x}; --rope-y: ${rope.y}; --rope-width: ${rope.width}; --rope-duration: ${rope.duration}s; --rope-delay: ${rope.delay ?? 0}s; --rope-sway: ${rope.sway}; --rope-twist: ${rope.twist}deg; --rope-origin-x: ${rope.originX}%; --rope-origin-y: ${rope.originY}%;`}
			>
				<img class="rope-image" src={rope.src} alt="" />
			</div>
		{/each}
	</div>
</div>

<style>
	.background-gears {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}

	.gear-stage {
		position: absolute;
		top: 50%;
		left: 50%;
		width: min(100vw, calc(100vh * 16 / 9));
		aspect-ratio: 16 / 9;
		transform: translate(-50%, -50%);
	}

	.gear {
		position: absolute;
		top: calc(var(--gear-y) * 1%);
		left: calc(var(--gear-x) * 1%);
		width: calc(var(--gear-width) * 1%);
		transform: translate(-50%, -50%);
	}

	.rope {
		position: absolute;
		top: calc(var(--rope-y) * 1%);
		left: calc(var(--rope-x) * 1%);
		width: calc(var(--rope-width) * 1%);
		transform: translate(-50%, -50%);
	}

	.gear-image {
		display: block;
		width: 100%;
		height: auto;
		transform-origin: 50% 50%;
		animation: gear-spin var(--gear-duration) linear infinite;
	}

	.gear-image--reverse {
		animation-direction: reverse;
	}

	.rope-image {
		display: block;
		width: 100%;
		height: auto;
		transform-origin: var(--rope-origin-x) var(--rope-origin-y);
		animation: rope-wind var(--rope-duration) ease-in-out infinite;
		animation-delay: var(--rope-delay);
	}

	@keyframes gear-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes rope-wind {
		0%,
		100% {
			transform: translateX(calc(var(--rope-sway) * -1%)) rotate(calc(var(--rope-twist) * -1));
		}

		45% {
			transform: translateX(calc(var(--rope-sway) * 0.45%)) rotate(calc(var(--rope-twist) * 0.45));
		}

		70% {
			transform: translateX(calc(var(--rope-sway) * 1%)) rotate(var(--rope-twist));
		}
	}
</style>
