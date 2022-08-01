<script lang="ts">
	import { navigating } from '$app/stores';
	import { AnimationRole, mainScreenAnim } from '$lib/animations/page-transition-anim';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	let insets: Writable<any> = getContext('insets');
</script>

<div
	class="relative bg-slate-100"
	style="margin-top: {$insets.top}px; --offset: 200px;"
	in:mainScreenAnim={{
		navigation: $navigating,
		role: AnimationRole.to
	}}
	out:mainScreenAnim={{ navigation: $navigating, role: AnimationRole.from }}
>
	<slot name="header" />
	<slot />
</div>
