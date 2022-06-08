<script lang="ts">
import { onMount } from 'svelte';

import * as THREE from 'three'; 
const WHITE = 0xffffff; 

let canvas; 
let scene, clock, camera, renderer; 
let aspect

const setup = () => {
    scene = new THREE.Scene(); 
    clock = new THREE.Clock(true);

    renderer = new THREE.WebGLRenderer({
        canvas
    }); 

    aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); 
    camera.position.set(-20,20,40); 
    camera.lookAt(0,0,0);
    camera.position.add(new THREE.Vector3(-10, 0,0))
}



const resize = () => {
  aspect = window.innerWidth / window.innerHeight
  renderer.setPixelRatio(window.devicePixelRatio); 
  renderer.setSize(window.innerWidth, window.innerHeight); 
  camera.aspect = ( aspect); 
  camera.updateProjectionMatrix();
}

const animate = () => {
  requestAnimationFrame(animate); 
  renderer.render(scene, camera);

}

onMount(() => {
    console.log("Building threejs context...")
     setup();
     resize();
     animate();
     window.addEventListener('resize', resize)
})

</script>

<div class="relative inset-0 bg-white">
    <canvas bind:this={canvas} class="bg-red-400 fixed inset-0">Loading...</canvas>
</div>