<script lang="ts">
	import { nkReady } from '$lib/client';

	import {
		acceptChallenge,
		bookmarkChallenge,
		completeChallenge,
		currentLevelForChallenge,
		nextLevelForChallenge,
		rejectChallenge,
		unbookmarkChallenge,
		unrejectChallenge,
		type ChallengeAccept,
		type ChallengeBookmark,
		type ChallengeComplete,
		type ChallengeInteractionType,
		type ChallengeReject
	} from '$lib/services/challenge-storage';

	import { buttonAlerts } from '$lib/stores/button-alerts';
	import type { ChallengeV2 } from '$lib/types/challenges';

	import AcceptButton from '../buttons/accept-button.svelte';
	import CompleteChallengeButton from '../buttons/complete-challenge-button.svelte';
	import BookmarkButton from '../buttons/bookmark-button.svelte';
	import RejectButton from '../buttons/reject-button.svelte';
	import InviteFriendButton from '../buttons/invite-friend-button.svelte';
	import EndChallengeButton from '../buttons/end-challenge-button.svelte';
	import NotificationButton from '../buttons/notification-button.svelte';
	import { goto } from '$app/navigation';
	import { Capacitor } from '@capacitor/core';
	import { Share } from '@capacitor/share';
	import ShareAppButton from '../buttons/share-app-button.svelte';
	import { page } from '$app/stores';

	export let nextState: (string, ...args) => void;
	export let refetch: () => void;
	export let challenge: ChallengeV2;
	export let challengeState:
		| ChallengeBookmark
		| ChallengeAccept
		| ChallengeReject
		| ChallengeComplete;
	export let challengeStateType: ChallengeInteractionType | null;
</script>

<!-- Challenge State: {challengeState?.type} -->

<div class="h-24">
	<div
		class="grid grid-flow-col actions gap-2 place-content-evenly place-items-center"
		style="place-items: baseline; grid-template-columns: 1fr 1fr 1fr 1fr ;"
	>
		{#if $nkReady}
			<!-- challenge accepted -->
			{#if challengeState?.type === 'accept'}
				<!-- already doing it button -->
				<CompleteChallengeButton
					onClick={(e) => {
						console.log('complete challenge');

						const currentDifficulty = challengeState?.currentLevel ?? null;

						completeChallenge(challenge, currentDifficulty)
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
								nextState('completed');
							})
							.catch((err) => {
								console.error(err);
							});
					}}
				/>

				<NotificationButton
					onClick={(e) => {
						console.log('set notifications challenge');
						nextState('notifications');
					}}
				/>
				<EndChallengeButton
					onClick={(e) => {
						console.log('end challenge');
						nextState('cancel');
					}}
				/>
				<InviteFriendButton
					onClick={(e) => {
						console.log('invite friend to challenge');
						nextState('invite');
					}}
				/>

				<!-- what can we do with challenges that are already completed? -->
			{:else if challengeState?.type === 'complete'}
				<!-- already doing it button -->

				{#if (challenge.type && challenge.type === 'repeatable') || challenge.type === 'recurring'}
					<AcceptButton
						repeat
						onClick={async (e) => {
							console.log('accept challenge');
							acceptChallenge(challenge, currentLevelForChallenge(challenge, challengeState))
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
				{/if}

				<InviteFriendButton
					onClick={async (e) => {
						console.log('invite friend to challenge');
						if (Capacitor.isNativePlatform() && (await Share.canShare())) {
							await Share.share({
								title: `${challenge.title} bei climactivity`,
								text: `Möchtest du bei ${challenge.title} mitmachen?`,
								url: $page.url.href,
								dialogTitle: `${challenge.title} bei climactivity`
							});
						} else {
							nextState('invite');
						}
					}}
				/>
			{:else}
				<!-- accept button -->
				<AcceptButton
					onClick={async (e) => {
						console.log('accept challenge');
						acceptChallenge(challenge, currentLevelForChallenge(challenge, challengeState))
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
						if (challengeState && challengeState.type === 'bookmark') {
							console.log('unbookmark challenge');

							if (await unbookmarkChallenge(challenge)) {
								console.log('unbookmarked challenge');
							}

							setTimeout(() => {
								refetch();
								goto(`/challenge/${challenge.slug}`, { replaceState: true, noscroll: true });
							}, 250);
							return;
						}
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
				<CompleteChallengeButton
					skip
					onClick={(e) => {
						console.log('already doing challenge');
						completeChallenge(challenge, currentLevelForChallenge(challenge, challengeState))
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
								nextState('already-doing-it');
							})
							.catch((err) => {
								console.error(err);
							});
					}}
				/>

				<!-- reject challenge button -->
				<RejectButton
					rejected={challengeState && challengeState.type === 'reject'}
					onClick={async (e) => {
						console.log('reject challenge');

						if (challengeState && challengeState.type === 'reject') {
							console.log('unreject challenge');

							if (await unrejectChallenge(challenge)) {
								console.log('unrejected challenge');
							}

							setTimeout(() => {
								refetch();
								goto(`/challenge/${challenge.slug}`, { replaceState: true, noscroll: true });
							}, 250);
							return;
						}

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
			{/if}
		{:else}
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
			<div class="animate-pulse rounded-full w-16 h-16 bg-slate-200" />
		{/if}
	</div>
</div>

<style lang="scss">
	.actions > * {
		align-self: start;
		:hover,
		:focus {
			outline: none;
		}
	}
</style>
