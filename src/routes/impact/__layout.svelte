<script lang="ts">
	import ProportionalHeader from '$lib/components/proportional-header.svelte';
	import MainContentContainer from '$lib/layouts/main-content-container.svelte';
	import MainScreenLayoutBase from '$lib/layouts/main-screen-layout-base.svelte';
	import { headerState } from '$lib/stores/header-store';

	let scrollPosition = 0;

	headerState.set({
		backbutton: false,
		title: 'Meine Wirkung',
		hidden: false
	});
</script>

<MainScreenLayoutBase>
	<!-- <div class="absolute top-0 left-0 right-0 h-60">
	</div> -->
	<ProportionalHeader
		bind:scrollPosition
		backbutton={false}
		shadowOffsetStart={0}
		shadowOffsetEnd={20}
		title="Feed"
	/>

	<MainContentContainer bind:y={scrollPosition}>
		<slot />
	</MainContentContainer>
</MainScreenLayoutBase>
