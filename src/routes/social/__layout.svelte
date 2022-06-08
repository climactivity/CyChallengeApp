<script lang="ts">
	import HeaderBar from '$lib/components/header-bar.svelte';
	import Fa from 'svelte-fa';
	import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

	import { headerState } from '$lib/stores/header-store';
	import { fly, slide } from 'svelte/transition';

	headerState.set({
		backbutton: false,
		title: 'Social',
		hidden: false
	});
</script>

<div transition:fly={{x: 200, duration: 1000}} class="absolute top-0 left-0 right-0">
	<HeaderBar/>
	<slot />
</div>
