<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'Einstellungen',
		hidden: false
	});
</script>

<div>Settings</div>
