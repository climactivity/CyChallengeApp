import type { ChallengeV2 } from '$lib/types/challenges';
import { readStorage, writeStorage } from './client-storage-engine';

export type ChallengeInteractionType = 'accept' | 'bookmark' | 'complete' | 'reject';
export interface ChallengeInteraction {
	type: ChallengeInteractionType;
	challengeSlug: string;
	at: Date;
	updatedAt?: Date;
}

export interface ChallengeBookmark extends ChallengeInteraction {
	type: 'bookmark';
	bookmarkedAt: Date;
}

export interface ChallengeReject extends ChallengeInteraction {
	type: 'reject';
	reason?: string;
	message?: string;
}

export interface ChallengeAccept extends ChallengeInteraction {
	type: 'accept';
	challengeType: 'recurring' | 'one-time';
	nextNotification?: Date | null;
	nextCheckpoint: Date | null;
	completions?: { completedAt: Date }[];
}

export interface ChallengeComplete extends ChallengeInteraction {
	type: 'complete';
	completedAt: Date;
	skipped: boolean;
	completions?: { completedAt: Date }[];
}

export function instanceOfChallengeBookmark(value): value is ChallengeBookmark {
	return 'type' in value && value.type === 'bookmark';
}

export function instanceOfChallengeReject(value): value is ChallengeReject {
	return 'type' in value && value.type === 'reject';
}

export function instanceOfChallengeAccept(value): value is ChallengeAccept {
	return 'type' in value && value.type === 'accept';
}

export function instanceOfChallengeComplete(value): value is ChallengeComplete {
	return 'type' in value && value.type === 'complete';
}

// export function instanceOfChallengeInteraction(value): value is ChallengeInteraction {
// 	return 'type' in value;
// }

export const getChallengeUserData = async (challengeSlug) => {
	const challengeState = await readStorage('challenges', `${challengeSlug}`);
	// console.log('getChallengeUserData', challengeSlug, challengeState);

	if (challengeState === null) {
		return null;
	}
	if (challengeState instanceof Error) {
		throw challengeState;
	}
	return challengeState;
};

export const getChallengeState = async (
	challengeSlug: string
): Promise<ChallengeAccept | ChallengeBookmark | ChallengeComplete | ChallengeReject> => {
	const storageObject = await getChallengeUserData(challengeSlug);
	// console.log('getChallengeState', challengeSlug, storageObject);
	if (storageObject === null) {
		return null;
	}
	if (
		instanceOfChallengeAccept(storageObject.value) ||
		instanceOfChallengeBookmark(storageObject.value) ||
		instanceOfChallengeComplete(storageObject.value) ||
		instanceOfChallengeReject(storageObject.value)
	)
		return storageObject.value ?? null;
};

export const acceptChallenge = async (challenge: ChallengeV2, nextCheckpoint?: Date) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	let acceptedChallenge: ChallengeAccept = {
		type: 'accept',
		challengeSlug: challenge.slug,
		at: new Date(),
		nextCheckpoint,
		challengeType: challenge.type ?? 'recurring'
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

export const bookmarkChallenge = async (
	challenge: ChallengeV2
): Promise<ChallengeBookmark | null> => {
	const challengeState = await getChallengeUserData(challenge.slug);

	const bookmarkedChallenge: ChallengeBookmark = {
		type: 'bookmark',
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
			return await writeStorage('challenges', `${challenge.slug}`, bookmarkedChallenge, version);
		}
	}
	return await writeStorage('challenges', `${challenge.slug}`, bookmarkedChallenge);
};

export const rejectChallenge = async (challenge: ChallengeV2, reason?, message?) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	const rejectedChallenge: ChallengeReject = {
		type: 'reject',
		challengeSlug: challenge.slug,
		at: new Date(),
		reason,
		message
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
	return await writeStorage('challenges', `${challenge.slug}`, rejectedChallenge);
};

export const completeChallenge = async (challenge: ChallengeV2, finalize = false) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeAccept(value)) {
			// if the challenge is a one-time challenge, we can mark it as completed
			if (value.challengeType === 'one-time') {
				const completedChallenge: ChallengeComplete = {
					type: 'complete',
					challengeSlug: challenge.slug,
					at: new Date(),
					completedAt: new Date(),
					skipped: false
				};
				return await writeStorage('challenges', `${challenge.slug}`, completedChallenge, version);
			} else if (finalize) {
				// if the challenge is a recurring challenge and finlize is true, we can mark it as completed
				const completedChallenge: ChallengeComplete = {
					type: 'complete',
					challengeSlug: challenge.slug,
					at: new Date(),
					completedAt: new Date(),
					skipped: false,
					completions: value.completions
				};
				return await writeStorage('challenges', `${challenge.slug}`, completedChallenge, version);
			} else {
				// the challenge is a recurring challenge and finlize is false, we can add a new completion and mark it as accepted
				const acceptedChallenge: ChallengeAccept = {
					...value,
					completions: [...(value.completions ?? []), { completedAt: new Date() }]
				};

				return await writeStorage('challenges', `${challenge.slug}`, acceptedChallenge, version);
			}
		} else {
			console.error('Cannot reject a challenge that is already accepted bookmarked etc... ');
			return null;
		}
	}

	const completedChallenge: ChallengeComplete = {
		type: 'complete',
		challengeSlug: challenge.slug,
		at: new Date(),
		completedAt: new Date(),
		skipped: true
	};

	return await writeStorage('challenges', `${challenge.slug}`, completedChallenge);
};
