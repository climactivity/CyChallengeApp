<script lang="ts">
	import { navigating } from '$app/stores';
	import { AnimationRole, mainScreenAnim } from '$lib/animations/page-transition-anim';
	import { Capacitor } from '@capacitor/core';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	let insets: Writable<any> = getContext('insets');
</script>

<div
	class="relative bg-slate-100"
	style="margin-top: {Capacitor.getPlatform() === 'android'
		? '0'
		: $insets.top}px; --offset: 200px;"
	in:mainScreenAnim={{
		navigation: $navigating,
		role: AnimationRole.to
	}}
	out:mainScreenAnim={{ navigation: $navigating, role: AnimationRole.from }}
>
	<slot name="header" />
	<div class="overflow-y-auto">
		<slot />
		<!-- <div class="h-20 findme" /> -->
	</div>
</div>
