<script lang="ts">
import HeaderBar from "$lib/components/header-bar.svelte";

import { getContext } from "svelte";
import type { Writable } from "svelte/store";
import { fly, slide } from 'svelte/transition';


	let insets: Writable<any> = getContext("insets"); 
</script>

<div transition:fly={{x:200, duration: 1000}} class="absoulte top-0 left-0 right-0" style="padding-top: {$insets.top}px">
	<HeaderBar/>
	<div class="py-4 overflow-scroll h-screen pb-60">
		<slot />
	</div>
</div>

<style lang="scss">
</style>
