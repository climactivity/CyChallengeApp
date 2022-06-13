<script lang="ts">
	import Fa from 'svelte-fa';
	import { Share } from '@capacitor/share';
	import type { ShareOptions } from '@capacitor/share';
	import { faShare, faShareNodes } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import ButtonSecondaryCta from './buttons/button-secondary-cta.svelte';

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

{#if canShare}
	<ButtonSecondaryCta onClick={(e) => console.log(e)}>
		<div class="flex flex-row place-content-center gap-4 items-center w-full">
			<Fa icon={faShareNodes} /> Teilen
		</div>
	</ButtonSecondaryCta>
{:else}
	<a
		class="grid place-items-center w-full text-black border-2 border-nature-darkest font-bold font-serif text-lg bg-opacity-0 py-4 px-8 rounded"
		href="mailto:?body={`${shareOptions.text} \n ${shareOptions.url}`}&subject={shareOptions.title}"
		alt="share"
	>
		<div class="flex flex-row gap-4 items-center place-content-center">
			<Fa icon={faShare} /> Teilen
		</div>
	</a>
{/if}
