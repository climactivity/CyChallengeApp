<script>
	import HeaderBar from '$lib/components/header-bar.svelte';
</script>

<div>
	<HeaderBar title="Stats" backbutton={false} />
	<slot />
</div>
