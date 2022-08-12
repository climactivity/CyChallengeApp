<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	import { Capacitor } from '@capacitor/core';

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
	class=" overflow-y-auto overflow-x-hidden h-safe relative top-0 left-0 right-0  z-20 "
	on:scroll={(e) => updateHeader(e.currentTarget.scrollTop)}
>
	<slot />
</div>

{#if Capacitor.getPlatform() === 'ios'}
	<div class="h-20 findme">
		<pre>
*meow* *meow*
,_     _
|\\_,-~/
/ _  _ |    ,--.
(  @  @ )   / ,-'
\  _T_/-._( (
/         `. \
|         _  \ |
\ \ ,  /      |
|| |-_\__   /
((_/`(____,-'
</pre>
	</div>
{/if}
