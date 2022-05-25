<script lang="ts">
	import { headerState } from '$lib/stores/header-store';

	headerState.set({
		backbutton: true,
		title: 'Konsum Zelt',
		hidden: false
	});
</script>

<div>Konsum Zelt</div>
