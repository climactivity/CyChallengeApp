<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import enablePlugins from '$lib/plugins/EnablePlugins';
	import { onboardingGuard } from '$lib/stores/onboarding-store';
	import { updatePlayerState } from '$lib/stores/reward-store';
	import { onMount } from 'svelte';

	onMount(async () => {
		await prefetch('/challenges');
		await prefetch('/impact');
		await enablePlugins();
		await onboardingGuard();
		// await updatePlayerState();
	});
</script>

<div class="grid content-center w-full h-full absolute inset-0 ">
	<div class="mx-auto w-24 h-24 border-4 border-water2 border-r-2  rounded-full animate-spin" />
</div>
<!-- 
<a class="hidden" prefetch href="/challenges" /> -->
