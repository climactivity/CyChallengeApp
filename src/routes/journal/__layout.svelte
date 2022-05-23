<script>
	import HeaderBar from '$lib/components/header-bar.svelte';
</script>

<div class="">
	<HeaderBar title="Journal" backbutton={false} />
	<div class="py-4 overflow-scroll h-screen">
		<slot />
	</div>
</div>

<style lang="scss">
</style>
