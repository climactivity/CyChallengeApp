<script>
	import HeaderBar from '$lib/components/header-bar.svelte';
</script>

<div>
	<HeaderBar title="Journal" backbutton={false} />
	<slot />
</div>
