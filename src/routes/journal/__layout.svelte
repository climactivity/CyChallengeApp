<script lang="ts">
import { getContext } from "svelte";
import type { Writable } from "svelte/store";


	let insets: Writable<any> = getContext("insets"); 
</script>

<div class="" style="padding-top: {$insets.top}px">
	<div class="py-4 overflow-scroll h-screen pb-60">
		<slot />
	</div>
</div>

<style lang="scss">
</style>
