<script lang="ts">
	import { onboardingGuard } from '$lib/stores/onboarding-store';

	import { onMount } from 'svelte';
	import { goto, prefetch } from '$app/navigation';
	import { onboarding } from '$lib/stores/onboarding-store';

	onMount(async () => {
		onboardingGuard();
		prefetch('/sector');
	});
</script>

<div class="absolute inset-0 grid grid-flow-row" style="grid-template-rows: 1fr 1fr 4rem 5rem ;">
	<slot />
</div>
