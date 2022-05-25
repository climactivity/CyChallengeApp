<script lang="ts">
	import HeaderBar from '$lib/components/header-bar.svelte';
	import Fa from 'svelte-fa';
	import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

	import { headerState } from '$lib/stores/header-store';

	headerState.set({
		backbutton: false,
		title: 'Social',
		hidden: false
	});
</script>

<div>
	<slot />
</div>
