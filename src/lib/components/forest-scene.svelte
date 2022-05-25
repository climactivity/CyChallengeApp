<script lang="ts">
	import {
		Canvas,
		Scene,
		PerspectiveCamera,
		Mesh,
		DirectionalLight,
		MeshStandardMaterial,
		BoxBufferGeometry,
		ConeBufferGeometry,
		CylinderBufferGeometry,
		PlaneGeometry,
		WebGLRenderer,
		AmbientLight,
		Vector3,
		MathUtils,
		FogExp2,
		OrbitControls
	} from 'svelthree';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	let skyColor = 0x87ceeb;
	let groundColor = 0xa0cf21;

	let hS: number;
	let vS: number;
	let aS: number;

	let width = 3,
		height = 1,
		depth = 3,
		spin = 0;

	let clientWidth: number;
	let clientHeight: number;
	let fireMesh: any;

	let cubeGeometry = new CylinderBufferGeometry(1, 1, 3, 3);
	cubeGeometry.rotateX(-Math.PI / 2);

	let fireGeometry = new ConeBufferGeometry(2, 4, 8, 3);
	//fireGeometry.rotateX(-Math.PI / 2);

	let planeGeometry = new PlaneGeometry(200, 200);
	planeGeometry.rotateX(-Math.PI / 2);

	function handleOnClick(e: Event) {
		console.log("Hi, I was triggered from app's scope!");
	}

	let cubeMaterial0 = new MeshStandardMaterial();
	let cubeMaterial1 = new MeshStandardMaterial();
	let cubeMaterial2 = new MeshStandardMaterial();
	let cubeMaterial3 = new MeshStandardMaterial();
	let cubeMaterial4 = new MeshStandardMaterial();
	let cubeMaterial5 = new MeshStandardMaterial();
	let cubeMaterial6 = new MeshStandardMaterial();

	let planeMaterial = new MeshStandardMaterial();

	$: hS = Math.sqrt(3) * width;
	$: vS = 2 * depth;
	$: aS = height / 2;
</script>

{#if browser}
	<div bind:clientWidth bind:clientHeight class="w-full h-screen">
		{#if clientWidth}
			<Canvas let:sti w={clientWidth} h={clientHeight} interactive>
				<Scene
					{sti}
					let:scene
					id="scene1"
					props={{ background: skyColor, fog: new FogExp2(skyColor, 0.05) }}
				>
					<PerspectiveCamera
						{scene}
						id="cam1"
						props={{ position: [0, 30, 30], lookAt: [0, 0, 0] }}
					/>

					<DirectionalLight {scene} props={{ position: [-2, 3, 2], intensity: 1.0 }} castShadow />

					<AmbientLight {scene} props={{ color: 0xffffff, intensity: 0.2 }} />

					<Mesh
						{scene}
						geometry={fireGeometry}
						material={cubeMaterial0}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0xff3e00 }}
						pos={[0, aS, 0]}
						interact
						on:click={handleOnClick}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={cubeGeometry}
						material={cubeMaterial1}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0xe40045 }}
						pos={[-hS / 2, aS, -vS]}
						rot={[0, Math.PI / 6, 0]}
						interact
						on:click={() => goto('/sector/energy')}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={cubeGeometry}
						material={cubeMaterial2}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0x5689a0 }}
						pos={[hS / 2, aS, -vS]}
						rot={[0, -Math.PI / 6, 0]}
						interact
						on:click={() => goto('/sector/private-engagement')}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={cubeGeometry}
						material={cubeMaterial3}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0x37647a }}
						pos={[hS, height / 2, 0]}
						rot={[0, Math.PI / 2, 0]}
						interact
						on:click={() => goto('/sector/public-engagement')}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={cubeGeometry}
						material={cubeMaterial4}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0xf5af19 }}
						pos={[-hS, height / 2, 0]}
						rot={[0, Math.PI / 2, 0]}
						interact
						on:click={() => goto('/sector/mobility')}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={cubeGeometry}
						material={cubeMaterial5}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0xa03c7d }}
						pos={[-hS / 2, aS, vS]}
						rot={[0, -Math.PI / 6, 0]}
						interact
						on:click={() => goto('/sector/consumption')}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={cubeGeometry}
						material={cubeMaterial6}
						mat={{ roughness: 1.0, metalness: 0.0, color: 0x95c11e }}
						pos={[hS / 2, aS, vS]}
						rot={[0, Math.PI / 6, 0]}
						interact
						on:click={() => goto('/sector/food')}
						receiveShadow
						castShadow
					/>

					<Mesh
						{scene}
						geometry={planeGeometry}
						material={planeMaterial}
						mat={{ roughness: 1.0, metalness: 0.0, color: groundColor }}
						pos={[0, 0, 0]}
						receiveShadow
						castShadow
					/>

					<OrbitControls {scene} enableDamping />
				</Scene>

				<WebGLRenderer
					{sti}
					sceneId="scene1"
					camId="cam1"
					config={{ antialias: true, alpha: false }}
					enableShadowMap
				/>
			</Canvas>
		{/if}
	</div>
{/if}
<!--
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

	</SC.Group>
	<SC.PerspectiveCamera position={[0, 10, 7]} />
	<SC.OrbitControls />

	<SC.AmbientLight intensity={0.5} />
	<SC.DirectionalLight intensity={0.5} position={[-2, 3, 2]} shadow={{ mapSize: [2048, 2048] }} />
</SC.Canvas> -->
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
