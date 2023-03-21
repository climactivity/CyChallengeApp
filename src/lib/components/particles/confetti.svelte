<script lang="ts">
	import { onMount } from 'svelte';
	import { loadConfettiPreset } from 'tsparticles-preset-confetti';

	export let quantity = 35,
		height = 5;
	let confettiConfig = {
		particles: {
			number: {
				value: 0
			},
			color: {
				value: ['#e40045', '#8BB9C3', '#95c11e']
			},
			shape: {
				type: ['circle', 'square'],
				options: {}
			},
			opacity: {
				value: 1,
				animation: {
					enable: true,
					minimumValue: 0,
					speed: 2,
					startValue: 'max',
					destroy: 'min'
				}
			},
			size: {
				value: 4,
				random: {
					enable: true,
					minimumValue: 2
				}
			},
			links: {
				enable: false
			},
			life: {
				duration: {
					sync: true,
					value: 5
				},
				count: 1
			},
			move: {
				enable: true,
				gravity: {
					enable: true,
					acceleration: 10
				},
				speed: {
					min: 10,
					max: 20
				},
				decay: 0.1,
				direction: 'none',
				straight: false,
				outModes: {
					default: 'none',
					top: 'none'
				}
			},
			rotate: {
				value: {
					min: 0,
					max: 360
				},
				direction: 'random',
				move: true,
				animation: {
					enable: true,
					speed: 60
				}
			},
			tilt: {
				direction: 'random',
				enable: true,
				move: true,
				value: {
					min: 0,
					max: 360
				},
				animation: {
					enable: true,
					speed: 60
				}
			},
			roll: {
				darken: {
					enable: true,
					value: 25
				},
				enable: true,
				speed: {
					min: 15,
					max: 25
				}
			},
			wobble: {
				distance: 30,
				enable: true,
				move: true,
				speed: {
					min: -15,
					max: 15
				}
			}
		},
		interactivity: {
			events: {
				onClick: {
					enable: false,
					mode: 'emitter'
				}
			},
			modes: {
				emitters: {
					life: {
						count: 1,
						duration: 0.1,
						delay: 0.6
					},
					rate: {
						delay: 0.1,
						quantity: 100
					},
					size: {
						width: 200,
						height: 0
					}
				}
			}
		}
	};
	onMount(async () => {
		const module = await import('svelte-particles');

		// console.log('imported confetti');
		ParticlesComponent = module.default;
	});

	let particlesContainer;
	let onParticlesLoaded = (event) => {
		particlesContainer = event.detail.particles;
		console.log('Confetti particle system initialized!');
		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	export let id = 'tsParticles';
	export const playAt = (e: MouseEvent) => {
		let y = (100 * e.clientY) / window.innerHeight;
		// console.log(e, e.clientY, window.innerHeight, y);
		play({ x: 0, y });
	};

	export const play = (position) => {
		// console.log(particlesContainer);
		if (!particlesContainer) {
			console.error('ParticlesComponent not initialized');
			return;
		}
		// particlesContainer.start();
		particlesContainer.addEmitter({
			life: {
				count: 1,
				duration: 0.1,
				delay: 0.6
			},
			rate: {
				delay: 0,
				quantity
			},
			size: {
				width: 200,
				height
			},
			position
		});

		particlesContainer.play();
	};

	let particlesInit = async (main) => {
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size

		await loadConfettiPreset(main);
	};
</script>

<div class="relative">
	<div class="container z-10">
		<slot />
	</div>
	<svelte:component
		this={ParticlesComponent}
		id="tsparticles"
		options={confettiConfig}
		on:particlesLoaded={onParticlesLoaded}
		{particlesInit}
	/>
	<!-- <ParticlesContainer
		{id}
		options={confettiConfig}
		on:particlesLoaded={onParticlesLoaded}
		on:particlesInit={particlesInit}
	/> -->
</div>

<style lang="scss">
	:global(#tsparticles) {
		margin: 0;
		padding: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.container {
		position: inherit;
	}
</style>
