<script lang="ts">
	import { nkReady } from '$lib/client';

	import {
		acceptChallenge,
		bookmarkChallenge,
		completeChallenge,
		rejectChallenge,
		type ChallengeAccept,
		type ChallengeBookmark,
		type ChallengeComplete,
		type ChallengeInteractionType,
		type ChallengeReject
	} from '$lib/services/challenge-storage';

	import { buttonAlerts } from '$lib/stores/button-alerts';
	import type { ChallengeV2 } from '$lib/types/challenges';

	import AcceptButton from '../buttons/accept-button.svelte';
	import AlreadyDoingItButton from '../buttons/already-doing-it-button.svelte';
	import BookmarkButton from '../buttons/bookmark-button.svelte';
	import RejectButton from '../buttons/reject-button.svelte';

	export let nextState: (string, ...args) => void;

	export let challenge: ChallengeV2;
	export let challengeState:
		| ChallengeBookmark
		| ChallengeAccept
		| ChallengeReject
		| ChallengeComplete;
	export let challengeStateType: ChallengeInteractionType | null;
</script>

<div class="h-24">
	{#if $nkReady}
		Challenge State: {challengeState?.type}
		<div class="grid grid-flow-col actions " style="place-items: baseline;">
			<!-- accept button -->
			<AcceptButton
				onClick={async (e) => {
					console.log('accept challenge');
					acceptChallenge(challenge)
						.then((value) => {
							console.log(value);
							if (value === null) {
								console.error('accept failed');
								return;
							}
							buttonAlerts.update((alerts) => [
								...alerts,
								{
									path: '/journal',
									type: 'attention'
								}
							]);
							nextState('accept');
						})
						.catch((err) => {
							console.error(err);
						});
				}}
			/>

			<!-- bookmark button -->
			<BookmarkButton
				bookmarked={challengeState && challengeState.type === 'bookmark'}
				onClick={async (e) => {
					console.log('bookmark challenge');
					bookmarkChallenge(challenge)
						.then((value) => {
							console.log(value);
							if (value === null) {
								console.error('bookmark failed');
								return;
							}
							buttonAlerts.update((alerts) => [
								...alerts,
								{
									path: '/journal',
									type: 'attention'
								}
							]);
							nextState('bookmark');
						})
						.catch((err) => {
							console.error(err);
						});
				}}
			/>

			<!-- already doing it button -->
			<AlreadyDoingItButton
				onClick={(e) => {
					console.log('already doing challenge');
					completeChallenge(challenge)
						.then((value) => {
							console.log(value);
							if (value === null) {
								console.error('accept failed');
								return;
							}
							buttonAlerts.update((alerts) => [
								...alerts,
								{
									path: '/journal',
									type: 'attention'
								}
							]);
							nextState('way-ahead-of-you');
						})
						.catch((err) => {
							console.error(err);
						});
				}}
			/>

			<!-- reject challenge button -->
			<RejectButton
				rejected={challengeState && challengeState.type === 'reject'}
				onClick={(e) => {
					console.log('reject challenge');
					rejectChallenge(challenge)
						.then((value) => {
							console.log(value);
							if (value === null) {
								console.error('accept failed');
								return;
							}
							buttonAlerts.update((alerts) => [
								...alerts,
								{
									path: '/journal',
									type: 'attention'
								}
							]);
							nextState('reject');
						})
						.catch((err) => {
							console.error(err);
						});
				}}
			/>
		</div>
	{:else}
		<div class="grid grid-flow-col actions " style="place-items: baseline;">
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
		</div>
	{/if}
</div>
