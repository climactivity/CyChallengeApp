<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

{#each [0, 1, 2, 3, 4, 5, 6] as i}
	<div
		class="grid grid-flow-col place-items-center animate-pulse h-14 opacity-40"
		style="grid-template-columns: 5rem 1fr;"
		out:fade={{ duration: 150 }}
	>
		<div class="w-12 h-12  m-1 bg-gray-300 bg-opacity-50 rounded-full grid place-items-center" />
		<div class="place-self-start w-[70%]">
			<div class=" font-bold h-7 mt-3 bg-gray-300 rounded-full w-48" />
		</div>
	</div>
{/each}
