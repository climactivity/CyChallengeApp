<script>
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-row gap-4 " out:fade>
	<div class="flex items-center mt-2 w-80 animate-pulse bg-gray-300 rounded-sm h-32" />
	<div class="flex items-center mt-2 w-80 animate-pulse bg-gray-300 rounded-sm h-32" />
</div>
