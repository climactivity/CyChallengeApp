<script lang="ts">
	import { navigating } from '$app/stores';

	import { slideLeft } from '$lib/animations/page-transition-anim';
	import { getContext } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	let insets: Writable<any> = getContext('insets');
</script>

<div
	class="relative bg-slate-100"
	style="margin-top: {$insets.top}px; --offset: 200px;"
	in:slideLeft={{ duration: 500, easing: cubicOut, navigation: $navigating }}
	out:slideLeft={{ navigation: $navigating }}
>
	<slot name="header" />
	<div
		class=" pt-16 py-4 overflow-x-hidden h-screen pb-16 relative top-0 left-0 right-0  bg-sector-food bg-sector  z-20 "
	>
		<slot />
	</div>
</div>
