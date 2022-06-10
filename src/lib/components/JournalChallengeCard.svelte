<script lang="ts">
	import type { AcceptedChallenge } from '$lib/types/challenges';
	import Fa from 'svelte-fa';
	import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';

	export let acceptedChallenge: AcceptedChallenge;
</script>

<a href="/journal/{acceptedChallenge.slug}" class="">
	<div class="shadow-md rounded-md bg-white mx-4 p-4">
		<div class="text-2xl text-center font-serif font-bold py-4">{acceptedChallenge.title}</div>
		<p class="font-sans-serif py-4">
			{acceptedChallenge.frontMatter}
		</p>
		<div class="relative py-4">
			<div class="absolute rounded-full bg-storm w-full h-1 my-[0.4rem]" />
			<div class="absolute flex flex-row w-full mx-auto justify-between ">
				{#each acceptedChallenge.completedSteps as step}
					<Fa icon={faCircleCheck} class="text-nature bg-white" />
				{/each}
				{#each acceptedChallenge.steps as step}
					<Fa icon={faCircleDot} class="text-storm  bg-white " />
				{/each}
			</div>
		</div>
	</div>
</a>
