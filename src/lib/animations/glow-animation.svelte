<script lang="ts">
	import type { GlowCornerRadius } from '$lib/types/challenges';
	import { CapsuleGeometry, NoToneMapping } from 'three';

	export let glow_line_length = '40';
	export let glow_line_width = '2px';
	export let glow_line_color = '#A0CF21';
	export let glow_blur_radius = '4px';
	export let glow_blur_width = '2px';
	export let glow_blur_color = '#A0CF21';
	export let glow_path_segments = 1;
	export let glow_animation_duration = '1200ms';
	export let glow_animation_speed = -100; /* in path length units */
	export let container_overflow = '100px';
	export let glow_path_length = 100;
	export let glow_path_offset = 100;
	export let glow_opacity = 1;
	export let glow_corner_radius: GlowCornerRadius = 'full';
	let _glow_corer_radius = 0;

	let line: SVGRect;

	$: switch (glow_corner_radius) {
		case 'sm': {
			_glow_corer_radius = 2;
			break;
		}
		case 'md': {
			_glow_corer_radius = 6;

			break;
		}
		case 'lg': {
			_glow_corer_radius = 8;

			break;
		}
		case 'xl': {
			_glow_corer_radius = 12;

			break;
		}
		case '2xl': {
			_glow_corer_radius = 16;

			break;
		}
		case '3xl': {
			_glow_corer_radius = 24;

			break;
		}
		case 'full': {
			_glow_corer_radius = 20;

			break;
		}
		case 'none': {
			_glow_corer_radius = 0;
			break;
		}
		default: {
			_glow_corer_radius = 4;
		}
	}
</script>

<div
	class="relative glow-effect"
	style="
        --glow-line-length: {glow_line_length};
        --glow-line-width: {glow_line_width};
        --glow-line-color: {glow_line_color};

        --glow-blur-radius: {glow_blur_radius};
        --glow-blur-width: {glow_blur_width};
        --glow-blur-color: {glow_blur_color};

        --glow-path-length: {glow_path_length};
        --glow-path-segments: {glow_path_segments};
        --glow-path-offset: {glow_path_offset};

        --glow-animation-duration: {glow_animation_duration};
        --glow-animation-speed: {glow_animation_speed}; /* in path length units (out of 100)*/

        /* the svg has to overflow its parent to allow the glow to show up outside of it*/
        --container-overflow: {container_overflow};
        --glow-opacity: {glow_opacity}]; 
    "
>
	<slot />
	<svg class="glow-container rounded">
		<rect
			rx={_glow_corer_radius}
			ry={_glow_corer_radius}
			class="glow-blur"
			stroke-linecap="round"
			pathLength={glow_path_length}
		/>
		<rect
			bind:this={line}
			rx={_glow_corer_radius}
			ry={_glow_corer_radius}
			class="glow-line"
			stroke-linecap="round"
			pathLength={glow_path_length}
		/>
	</svg>
</div>

<style lang="scss">
	.glow-effect {
		--glow-opacity: 1;
		--glow-line-length: 30;
		--glow-line-width: 2px;
		--glow-line-color: #f5ffeb;

		--glow-blur-radius: 4px;
		--glow-blur-width: 2px;
		--glow-blur-color: #c6ff84;

		--glow-path-segments: 1;
		--glow-path-offset: 0;

		--glow-animation-x: 1200ms;
		--glow-animation-speed: -100; /* in path length units (out of 100)*/

		/* the svg has to overflow its parent to allow the glow to show up outside of it*/
		--container-overflow: 100px;
		--glow-path-length: 100;
		--glow-corner-radius: 9999px;
	}

	.glow-container {
		pointer-events: none;
		position: absolute;
		width: calc(100% + var(--container-overflow));
		height: calc(100% + var(--container-overflow));
		inset: calc(var(--container-overflow) * -1 / 2);

		opacity: var(--glow-opacity);
		// animation: glow-permanent 3s linear;
		// outline: 3px solid black;
	}

	.glow-blur,
	.glow-line {
		// rx: var(--glow-corner-radius);
		width: calc(100% - var(--container-overflow));
		height: calc(100% - var(--container-overflow));

		x: calc(var(--container-overflow) / 2);
		y: calc(var(--container-overflow) / 2);
		fill: transparent;
		stroke-width: 2px;

		// stroke-dashoffset: var(--glow-path-offset);

		stroke-dasharray: var(--glow-line-length)
			calc(calc(var(--glow-path-length) / var(--glow-path-segments)) - var(--glow-line-length));

		animation-name: glow-permanent;
		animation-duration: var(--glow-animation-duration);
		animation-delay: 0s;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
	}

	.glow-line {
		stroke: var(--glow-line-color);
		stroke-width: var(--glow-line-width);
	}
	.glow-blur {
		filter: blur(var(--glow-blur-radius));
		stroke-width: var(--glow-blur-width);
		stroke: var(--glow-blur-color);
	}

	// .glow-effect:is(:hover, :focus) :is(.glow-line, .glow-blur) {
	// 	stroke-dashoffset: calc(var(--glow-path-offset) + var(--glow-animation-speed));
	// 	transition: stroke-dashoffset var(--glow-animation-duration) ease-in;
	// }

	// .glow-effect:is(:hover, :focus) .glow-container {
	// 	animation: glow-visibility var(--glow-animation-duration) infinite;
	// }

	@keyframes glow-permanent {
		0% {
			stroke-dashoffset: var(--glow-path-offset);
		}
		100% {
			// stroke-dashoffset: calc(var(--glow-path-offset) + var(--glow-animation-speed));
		}
	}

	@keyframes glow-visibility {
		0%,
		100% {
			opacity: 0;
		}
		25%,
		75% {
			opacity: 1;
		}
	}
</style>
