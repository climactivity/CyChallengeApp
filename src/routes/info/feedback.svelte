<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'Feedback',
		hidden: false
	});
</script>

<div>Feedback Form</div>
