<script lang="ts">
	import { goto, prefetch } from '$app/navigation';
	import { onboarding, onboardingGuard } from '$lib/stores/onboarding-store';
	import { onMount } from 'svelte';

	onMount(async () => {
		onboardingGuard();
	});
</script>

<h1>Index</h1>
