<script lang="ts">
	import HeaderBar from '$lib/components/header-bar.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	let title = writable('');
	setContext('title', title);
</script>

<div class="">
	<HeaderBar title={$title} backbutton={true} />
	<div class="py-4 overflow-scroll h-screen">
		<slot />
	</div>
</div>

<style lang="scss">
</style>
