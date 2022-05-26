<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { onboarding, onboardingGuard } from '$lib/stores/onboarding-store';
	import { onMount } from 'svelte';

	onMount(async () => {
		onboardingGuard();
	});
</script>

<div class="grid content-center w-full h-full absolute inset-0 ">
	<div class="mx-auto w-24 h-24 border-4 border-water2 border-r-2  rounded-full animate-spin" />
</div>
