import type { ChallengeV2 } from '$lib/types/challenges';
import { readStorage, writeStorage } from './client-storage-engine';

type ChallengeInteraction = {
	challengeSlug: string;
	at: Date;
	updatedAt?: Date;
};

export type ChallengeBookmark = ChallengeInteraction & {
	bookmarkedAt: Date;
};

export type ChallengeReject = ChallengeInteraction & {
	reason: string;
	message?: string;
};

export type ChallengeAccept = ChallengeInteraction & {
	type: 'recurring' | 'one-time';
	nextNotification?: Date | null;
	nextCheckpoint: Date | null;
	completions?: { completedAt: Date }[];
};

export type ChallengeComplete = ChallengeInteraction & {
	completedAt: Date;
	skipped: boolean;
	completions?: { completedAt: Date }[];
};

function instanceOfChallengeBookmark(value): value is ChallengeBookmark {
	return 'bookmarkedAt' in value;
}

function instanceOfChallengeReject(value): value is ChallengeReject {
	return 'reason' in value;
}

function instanceOfChallengeAccept(value): value is ChallengeAccept {
	return 'type' in value;
}

function instanceOfChallengeComplete(value): value is ChallengeComplete {
	return 'completedAt' in value;
}

export const getChallengeState = async (challenge) => {
	const challengeState = await readStorage('challenges', `${challenge.slug}`);
	if (challengeState === null) {
		return null;
	}
	if (challengeState instanceof Error) {
		throw challengeState;
	}
	return challengeState;
};

export const acceptChallenge = async (challenge: ChallengeV2, nextCheckpoint: Date) => {
	const challengeState = await getChallengeState(challenge);

	let acceptedChallenge: ChallengeAccept = {
		challengeSlug: challenge.slug,
		at: new Date(),
		nextCheckpoint,
		type: challenge.type ?? 'recurring'
	};

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeAccept(value)) {
			console.error('Challenge already accepted');
		}
		if (instanceOfChallengeAccept(value)) {
			acceptedChallenge = {
				...value,
				nextCheckpoint
			};
			return await writeStorage('challenges', `${challenge.slug}`, acceptedChallenge, version);
		} else {
			return await writeStorage('challenges', `${challenge.slug}`, acceptedChallenge, version);
		}
	}
	return await writeStorage('challenges', `${challenge.slug}`, acceptedChallenge);
};

export const bookmarkChallenge = async (challenge: ChallengeV2) => {
	const challengeState = await getChallengeState(challenge);

	const bookmarkChallenge: ChallengeBookmark = {
		challengeSlug: challenge.slug,
		at: new Date(),
		bookmarkedAt: new Date()
	};

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeBookmark(value)) {
			return value;
		} else if (instanceOfChallengeAccept(value)) {
			console.error('Cannot bookmark a challenge that is already accepted');
			return null;
		} else {
			return await writeStorage('challenges', `${challenge.slug}`, bookmarkChallenge, version);
		}
	}
	return await writeStorage('challenges', `${challenge.slug}`, bookmarkChallenge);
};

export const rejectChallenge = async (challenge: ChallengeV2) => {
	const challengeState = await getChallengeState(challenge);

	const bookmarkChallenge: ChallengeBookmark = {
		challengeSlug: challenge.slug,
		at: new Date(),
		bookmarkedAt: new Date()
	};

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeReject(value)) {
			return value;
		} else {
			console.error('Cannot reject a challenge that is already accepted bookmarked etc... ');
			return null;
		}
	}
	return await writeStorage('challenges', `${challenge.slug}`, bookmarkChallenge);
};

export const completeChallenge = async (challenge: ChallengeV2, finalize = false) => {
	const challengeState = await getChallengeState(challenge);

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeAccept(value)) {
			// if the challenge is a one-time challenge, we can mark it as completed
			if (value.type === 'one-time') {
				const completeChallenge: ChallengeComplete = {
					challengeSlug: challenge.slug,
					at: new Date(),
					completedAt: new Date(),
					skipped: false
				};
				return await writeStorage('challenges', `${challenge.slug}`, completeChallenge, version);
			} else if (finalize) {
				// if the challenge is a recurring challenge and finlize is true, we can mark it as completed
				const completeChallenge: ChallengeComplete = {
					challengeSlug: challenge.slug,
					at: new Date(),
					completedAt: new Date(),
					skipped: false,
					completions: value.completions
				};
				return await writeStorage('challenges', `${challenge.slug}`, completeChallenge, version);
			} else {
				// the challenge is a recurring challenge and finlize is false, we can add a new completion and mark it as accepted
				const acceptChallenge: ChallengeAccept = {
					...value,
					completions: [...(value.completions ?? []), { completedAt: new Date() }]
				};

				return await writeStorage('challenges', `${challenge.slug}`, acceptChallenge, version);
			}
		} else {
			console.error('Cannot reject a challenge that is already accepted bookmarked etc... ');
			return null;
		}
	}

	const completeChallenge: ChallengeComplete = {
		challengeSlug: challenge.slug,
		at: new Date(),
		completedAt: new Date(),
		skipped: true
	};

	return await writeStorage('challenges', `${challenge.slug}`, completeChallenge);
};
