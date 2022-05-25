<script>
	import { headerState } from '$lib/stores/header-store';

	headerState.set({
		backbutton: false,
		title: 'Stats',
		hidden: false
	});
</script>

<div>
	<slot />
</div>
