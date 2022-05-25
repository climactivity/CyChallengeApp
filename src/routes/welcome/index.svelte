<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { onboarding } from '$lib/stores/onboarding-store';
	import { onMount } from 'svelte';

	const onboaringComplete = async () => {
		onboarding.set({
			hasOnboarded: true,
			skipped: false
		});

		goto('/sector');
	};

	const next = () => {};

	const prev = () => {};

	onMount(async () => {
		prefetch('/sector');
	});
</script>

<div class="absolute inset-0 ">
	<img src="https://picsum.photos/2000" alt="random bs" class="h-full object-cover" />
</div>

<div class="absolute inset-0 ">
	<div class="grid grid-flow-row h-full">
		<div class="mx-auto my-auto p-8 text-xl">
			<h1 class="text-center text-4xl my-8">Hello comrade</h1>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor. Labore amet deleniti
			ex debitis voluptatibus, temporibus.
		</div>
		<div class="mx-auto my-auto p-8">
			<a href="welcome/showcase/1" class="button-primary ">Los geht's</a>
		</div>
	</div>
</div>

<style lang="scss">
</style>
