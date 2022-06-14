<script>
	import ForestScene from '$lib/components/forest-scene-placeholder.svelte';
	import { headerState } from '$lib/stores/header-store';

	headerState.set({
		backbutton: false,
		title: 'Forest',
		hidden: true
	});
</script>

<div class="overflow-scroll h-screen">
	<div class="absolute top-0 right-0 left-0 bottom-0">
		<ForestScene />
	</div>
</div>
