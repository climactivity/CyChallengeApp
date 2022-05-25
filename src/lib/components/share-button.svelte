<script lang="ts">
	import Fa from 'svelte-fa';
	import { Share } from '@capacitor/share';
	import type { ShareOptions } from '@capacitor/share';
	import { faShare, faShareNodes } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';

	export let shareOptions: Partial<ShareOptions>;

	export let canShare = false;
	const onShare = async () => {
		if (canShare) {
			Share.share({ ...shareOptions });
		} else {
		}
	};

	onMount(async () => {
		canShare = (await Share.canShare()).value;
	});
</script>

<div
	class="grid content-center text-white px-4 w-12 h-12 bg-nature rounded-full hover:bg-nature-dark active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
>
	{#if canShare}
		<div class="block" on:click={(_) => onShare()}>
			<Fa icon={faShareNodes} />
		</div>
	{:else}
		<a
			class="block"
			href="mailto:?body={`${shareOptions.text} \n ${shareOptions.url}`}&subject={shareOptions.title}"
			alt="share"
		>
			<Fa icon={faShare} />
		</a>
	{/if}
</div>
