<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'Über uns',
		hidden: false
	});
</script>

<div>
	<slot />
</div>
