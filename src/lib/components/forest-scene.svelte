<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { onMount } from 'svelte';

	let skyColor = 0x87ceeb;
	let groundColor = 0x99ff66;

	let hS: number;
	let vS: number;
	let aS: number;

	let width = 1,
		height = 1,
		depth = 1,
		spin = 0;

	let fireMesh: any;

	$: hS = Math.sqrt(3) * width;
	$: vS = 2 * depth;
	$: aS = height / 2;
</script>

<SC.Canvas
	antialias
	background={new THREE.Color(skyColor)}
	shadows
	fog={new THREE.FogExp2(skyColor, 0.05)}
>
	<SC.Group position={[0, 0, 0]}>
		<SC.Mesh
			geometry={new THREE.BoxGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xc026d3 })}
			scale={[width, height, depth]}
			position={[hS / 2, aS, vS]}
			rotation={[0, spin, 0]}
			castShadow
		/>

		<SC.Mesh
			geometry={new THREE.BoxGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xc026d3 })}
			scale={[width, height, depth]}
			position={[-hS / 2, aS, vS]}
			rotation={[0, spin, 0]}
			castShadow
		/>

		<SC.Mesh
			geometry={new THREE.BoxGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xc026d3 })}
			scale={[width, height, depth]}
			position={[-hS, height / 2, 0]}
			rotation={[0, spin, 0]}
			castShadow
		/>

		<SC.Mesh
			geometry={new THREE.BoxGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xc026d3 })}
			scale={[width, height, depth]}
			position={[hS, height / 2, 0]}
			rotation={[0, spin, 0]}
			castShadow
		/>

		<SC.Mesh
			geometry={new THREE.BoxGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xc026d3 })}
			scale={[width, height, depth]}
			position={[hS / 2, aS, -vS]}
			rotation={[0, spin, 0]}
			castShadow
		/>

		<SC.Mesh
			geometry={new THREE.BoxGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xc026d3 })}
			scale={[width, height, depth]}
			position={[-hS / 2, aS, -vS]}
			rotation={[0, spin, 0]}
			castShadow
		/>

		<SC.Mesh
			on:click={(e) => console.error('hasdjkfhjksdfhjk')}
			geometry={new THREE.ConeGeometry()}
			material={new THREE.MeshStandardMaterial({ color: 0xf14400 })}
			scale={[0.6, height, 0.6]}
			position={[0, aS, 0]}
			rotation={[0, spin, 0]}
			castShadow
		/>
	</SC.Group>

	<SC.Group position={[0, 0, 0]}>
		<SC.Mesh
			geometry={new THREE.PlaneGeometry(50, 50)}
			material={new THREE.MeshStandardMaterial({ color: groundColor })}
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		/>

		<!-- <SC.Primitive object={new THREE.GridHelper(50, 50, 0x444444, 0x55555)} /> -->
	</SC.Group>
	<SC.PerspectiveCamera position={[0, 10, 7]} />
	<SC.OrbitControls />

	<SC.AmbientLight intensity={0.5} />
	<SC.DirectionalLight intensity={0.5} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas>

<div class="controls">
	<label><input type="range" bind:value={width} min={0.1} max={3.0} step={0.1} /> width</label>
	<label><input type="range" bind:value={height} min={0.1} max={3.0} step={0.1} /> height</label>
	<label><input type="range" bind:value={depth} min={0.1} max={3.0} step={0.1} /> depth</label>
</div>

<style>
	.controls {
		position: absolute;
		top: 1rem;
		left: 1rem;
		display: grid;
		grid-auto-flow: row;
		color: white;
		font-size: 20px;
	}
</style>
