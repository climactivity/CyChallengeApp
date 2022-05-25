<script context="module" lang="ts">
	export async function load({ params, fetch, session, stuff }) {
		console.log(params.slug);
		return {
			status: 200,
			props: {
				data: params.slug ?? {
					heroHref: 'https://picsum.photos/802',
					content: 'not found'
				}
			}
		};
	}
</script>

<script lang="ts">
	import IntroCard from '$lib/components/intro-card.svelte';

	import { onboardingStages } from '$testData/intro';
	export let data;
	import { fly } from 'svelte/transition';

	let heroHref, content;
	console.log(data);

	$: ({ heroHref, content } = onboardingStages[data]);
</script>

{#if data == 1}
	<IntroCard data={onboardingStages[1]} />
{/if}
{#if data == 2}
	<IntroCard data={onboardingStages[2]} />
{/if}
{#if data == 3}
	<IntroCard data={onboardingStages[3]} />
{/if}
