<script lang="ts">
	import ButtonPrimaryCta from '$lib/components/buttons/button-primary-cta.svelte';
	import ParticleSystem from '$lib/components/particles/confetti.svelte';
	let playAt;
</script>

<ParticleSystem bind:playAt />
<div class="m-4 p-4 space-y-4">
	<ButtonPrimaryCta onClick={(e) => playAt(e)}>confetti</ButtonPrimaryCta>

	<ButtonPrimaryCta onClick={(e) => playAt(e)}>confetti</ButtonPrimaryCta>

	<ButtonPrimaryCta onClick={(e) => playAt(e)}>confetti</ButtonPrimaryCta>

	<ButtonPrimaryCta onClick={(e) => playAt(e)}>confetti</ButtonPrimaryCta>

	<ButtonPrimaryCta onClick={(e) => playAt(e)}>confetti</ButtonPrimaryCta>
</div>
