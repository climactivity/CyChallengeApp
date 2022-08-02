<script lang="ts">
	import { headerState } from '$lib/stores/header-store';

	export let y = 0;
	let headerTransparent;

	export const headerTransparentOffset = 5;

	const updateHeader = (offset) => {
		const transparent = offset < headerTransparentOffset;
		y = offset;
		headerState.update((outgoing) => ({ ...outgoing, transparent }));
		return headerTransparent;
	};

	$: headerTransparent = updateHeader(y);
</script>

<div
	class="  overflow-x-hidden h-screen pb-16 relative top-0 left-0 right-0  z-20 "
	on:scroll={(e) => updateHeader(e.currentTarget.scrollTop)}
>
	<slot />
</div>
