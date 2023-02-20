<script lang="ts">
	import VSection from '$lib/components/challenge/v-section.svelte';
	import type { ChallengeV2 } from '$lib/types/challenges';
	import Fa from 'svelte-fa';
	import {
		faInstagram,
		faFacebook,
		faYoutube,
		faLinkedin,
		faTwitter
	} from '@fortawesome/free-brands-svg-icons';
	import { page } from '$app/stores';
	export let challenge: ChallengeV2;
</script>

<VSection {...$$props}>
	{#if challenge}
		<div class="font-serif font-semibold text-xl">
			Erzähle deinen Freund:innen von der Challenge „{challenge?.title}“
		</div>
	{:else}
		<div class="font-serif font-semibold text-xl">oder auf Social Media teilen:</div>
	{/if}
	<div class="flex flex-row gap-6 py-4 mx-auto place-content-evenly">
		<a
			href={`https://www.instagram.com/?url=${$page.url.href}`}
			target="_blank"
			rel="noopener"
			class="text-5xl z-20 block  text-storm-dark "><Fa size="md" icon={faInstagram} /></a
		>
		<a
			href={`href="https://www.facebook.com/sharer/sharer.php?u=${$page.url.href}`}
			target="_blank"
			rel="noopener"
			class="text-5xl  z-20 text-storm-dark "><Fa size="md" icon={faFacebook} /></a
		>
		<a
			href={`https://twitter.com/intent/tweet?text=${$page.url.href}`}
			target="_blank"
			rel="noopener"
			class="text-5xl  z-20 text-storm-dark "><Fa size="md" icon={faTwitter} /></a
		>
	</div>
</VSection>
