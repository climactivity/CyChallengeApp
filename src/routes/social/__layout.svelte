<script>
	import HeaderBar from '$lib/components/header-bar.svelte';
	import Fa from 'svelte-fa';
	import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
</script>

<div>
	<HeaderBar title="Social" backbutton={false}>
		<button slot="action">
			<Fa icon={faUserPlus} />
		</button>
	</HeaderBar>
	<slot />
</div>
