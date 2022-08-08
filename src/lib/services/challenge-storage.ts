import type { ChallengeV2 } from '$lib/types/challenges';
import { dropStorage, listStorage, readStorage, writeStorage } from './client-storage-engine';
import { DateTime } from 'luxon';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ChallengeInteractionType = 'accept' | 'bookmark' | 'complete' | 'reject';
export type ChallengeImpact = 'bigpoint' | 'peanut';
export type ChallegneType = 'one-time' | 'recurring' | 'repeatable';
export interface ChallengeInteraction {
	type: ChallengeInteractionType;
	challengeSlug: string;
	challengeTopic: string;
	challengeTags: string[];
	challengeImpact: string;
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
	challengeType: ChallegneType;
	nextNotification?: Date | null;
	nextCheckpoint: Date | null;
	currentLevel: Difficulty;
	completions?: { completedAt: Date; level: Difficulty }[];
}

export interface ChallengeComplete extends ChallengeInteraction {
	type: 'complete';
	completedAt: Date;
	skipped: boolean;
	completions?: { completedAt: Date; level: Difficulty }[];
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

const compareDifficulty = (a: Difficulty, b: Difficulty) => {
	if (a === 'easy') {
		return b === 'easy' ? 0 : -1;
	} else if (a === 'medium') {
		return b === 'easy' ? 1 : b === 'medium' ? 0 : -1;
	} else {
		return b === 'easy' ? 1 : b === 'medium' ? 1 : b === 'hard' ? 0 : -1;
	}
};

export const CHALLENGE_INTERACTIONS_COLLECTION = 'challenge-interactions';

export const nextLevelForChallenge = (challenge: ChallengeV2, challengeState): Difficulty => {
	if (
		challengeState === null ||
		challengeState.type === 'bookmark' ||
		challengeState.type === 'reject' ||
		(challengeState.type === 'accept' &&
			(challengeState as ChallengeAccept).completions === undefined)
	) {
		return challenge.difficulties['easy']
			? 'medium'
			: challenge.difficulties['medium']
			? 'hard'
			: null;
	}

	if (challengeState.type === 'completed') {
		return null;
	}

	if (challengeState.type === 'accept') {
		const highestCompletion = (challengeState as ChallengeAccept).completions.reduce(
			(acc, cur) => {
				return compareDifficulty(acc.level, cur.level) > 0 ? acc : cur;
			},
			{ level: 'easy' as Difficulty }
		);
		return highestCompletion.level === 'easy'
			? 'medium'
			: highestCompletion.level === 'medium'
			? 'hard'
			: null;
	}
};

export const currentLevelForChallenge = (challenge: ChallengeV2, challengeState): Difficulty => {
	if (null || challengeState.type === 'bookmark' || challengeState.type === 'reject') {
		return challenge.difficulties['easy']
			? 'easy'
			: challenge.difficulties['medium']
			? 'medium'
			: challenge.difficulties['hard']
			? 'hard'
			: null;
	}

	if (challengeState.type === 'completed') {
		return null;
	}

	if (challengeState.type === 'accept') {
		const highestCompletion = (challengeState as ChallengeAccept).completions.reduce(
			(acc, cur) => {
				return compareDifficulty(acc.level, cur.level) > 0 ? acc : cur;
			},
			{ level: 'easy' as Difficulty }
		);
		return highestCompletion.level;
	}
};

export const getLastCompletion = (challengeState): DateTime | null => {
	if (challengeState.type === 'bookmark' || challengeState.type === 'reject') {
		return null;
	}

	if (challengeState.type === 'complete') {
		return DateTime.fromISO(challengeState.completedAt);
	}

	if (challengeState.type === 'accept') {
		const last = (challengeState as ChallengeAccept).completions.reduce((acc, cur) => {
			const curDT = DateTime.fromISO(cur.completedAt);
			console.log(acc, cur.completedAt, curDT);
			if (curDT.ts > acc.ts) {
				console.log('returning', curDT);
				return curDT;
			}
			return acc;
			// return curDT > acc ? curDT : acc;
		}, DateTime.fromISO('1970-01-01T00:00:00.000Z'));

		console.log('last', last);
		return last;
	}
};

export const getChallengeUserData = async (challengeSlug) => {
	const challengeState = await readStorage(CHALLENGE_INTERACTIONS_COLLECTION, `${challengeSlug}`);
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

export const acceptChallenge = async (
	challenge: ChallengeV2,
	difficulty: Difficulty,
	nextCheckpoint?: Date
) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	let acceptedChallenge: ChallengeAccept = {
		type: 'accept',
		challengeSlug: challenge.slug,
		challengeImpact: challenge.impact,
		challengeTopic: challenge.topic,
		challengeTags: challenge.tags,
		at: new Date(),
		nextCheckpoint,
		currentLevel: difficulty,
		challengeType: challenge.type ?? 'recurring'
	};

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeAccept(value)) {
			acceptedChallenge = {
				...value,
				nextCheckpoint,
				currentLevel: difficulty
			};
			return await writeStorage(
				CHALLENGE_INTERACTIONS_COLLECTION,
				`${challenge.slug}`,
				acceptedChallenge,
				version
			);
		}
		if (instanceOfChallengeAccept(value)) {
			acceptedChallenge = {
				...value,
				nextCheckpoint
			};
			return await writeStorage(
				CHALLENGE_INTERACTIONS_COLLECTION,
				`${challenge.slug}`,
				acceptedChallenge,
				version
			);
		} else if (instanceOfChallengeComplete(value)) {
			acceptedChallenge = {
				...value,
				type: 'accept',
				nextCheckpoint,
				challengeType: challenge.type ?? 'recurring',
				currentLevel: difficulty
			};
			return await writeStorage(
				CHALLENGE_INTERACTIONS_COLLECTION,
				`${challenge.slug}`,
				acceptedChallenge,
				version
			);
		} else {
			return await writeStorage(
				CHALLENGE_INTERACTIONS_COLLECTION,
				`${challenge.slug}`,
				acceptedChallenge,
				version
			);
		}
	}
	return await writeStorage(
		CHALLENGE_INTERACTIONS_COLLECTION,
		`${challenge.slug}`,
		acceptedChallenge
	);
};

export const bookmarkChallenge = async (
	challenge: ChallengeV2
): Promise<ChallengeBookmark | null> => {
	const challengeState = await getChallengeUserData(challenge.slug);

	const bookmarkedChallenge: ChallengeBookmark = {
		type: 'bookmark',
		challengeSlug: challenge.slug,
		challengeImpact: challenge.impact,
		challengeTopic: challenge.topic,
		challengeTags: challenge.tags,
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
			return await writeStorage(
				CHALLENGE_INTERACTIONS_COLLECTION,
				`${challenge.slug}`,
				bookmarkedChallenge,
				version
			);
		}
	}
	return await writeStorage(
		CHALLENGE_INTERACTIONS_COLLECTION,
		`${challenge.slug}`,
		bookmarkedChallenge
	);
};

export const unbookmarkChallenge = async (challenge: ChallengeV2) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeBookmark(value)) {
			return await dropStorage(CHALLENGE_INTERACTIONS_COLLECTION, `${challenge.slug}`);
		} else {
			return false;
		}
	}
	return false;
};

export const rejectChallenge = async (challenge: ChallengeV2, reason?, message?) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	const rejectedChallenge: ChallengeReject = {
		challengeImpact: challenge.impact,
		challengeTopic: challenge.topic,
		challengeTags: challenge.tags,
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
		} else if (instanceOfChallengeAccept(value) || instanceOfChallengeComplete(value)) {
			console.error('Cannot reject a challenge that is already accepted or completed');
			return null;
		} else {
			return await writeStorage(
				CHALLENGE_INTERACTIONS_COLLECTION,
				`${challenge.slug}`,
				rejectedChallenge,
				version
			);
		}
	}
	return await writeStorage(
		CHALLENGE_INTERACTIONS_COLLECTION,
		`${challenge.slug}`,
		rejectedChallenge
	);
};

export const unrejectChallenge = async (challenge: ChallengeV2) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeReject(value)) {
			return await dropStorage(CHALLENGE_INTERACTIONS_COLLECTION, `${challenge.slug}`);
		} else {
			return false;
		}
	}
	return false;
};

export const completeChallenge = async (
	challenge: ChallengeV2,
	level: Difficulty = 'easy',
	finalize = false
) => {
	const challengeState = await getChallengeUserData(challenge.slug);

	if (challengeState !== null) {
		const { value, version } = challengeState;
		if (instanceOfChallengeAccept(value)) {
			// if the challenge is a one-time challenge, we can mark it as completed
			if (value.challengeType === 'one-time' || value.challengeType === 'repeatable') {
				const completedChallenge: ChallengeComplete = {
					challengeImpact: challenge.impact,
					challengeTopic: challenge.topic,
					challengeTags: challenge.tags,
					type: 'complete',
					challengeSlug: challenge.slug,
					at: new Date(),
					completedAt: new Date(),
					skipped: false,
					completions: value.completions
						? [...value.completions, { level, completedAt: new Date() }]
						: [{ level, completedAt: new Date() }]
				};
				return await writeStorage(
					CHALLENGE_INTERACTIONS_COLLECTION,
					`${challenge.slug}`,
					completedChallenge,
					version
				);
			} else if (finalize) {
				// if the challenge is a recurring challenge and finlize is true, we can mark it as completed
				const completedChallenge: ChallengeComplete = {
					type: 'complete',
					challengeImpact: challenge.impact,
					challengeTopic: challenge.topic,
					challengeTags: challenge.tags,
					challengeSlug: challenge.slug,
					at: new Date(),
					completedAt: new Date(),
					skipped: false,
					completions: value.completions
						? [...value.completions, { level, completedAt: new Date() }]
						: [{ level, completedAt: new Date() }]
				};
				return await writeStorage(
					CHALLENGE_INTERACTIONS_COLLECTION,
					`${challenge.slug}`,
					completedChallenge,
					version
				);
			} else {
				// the challenge is a recurring challenge and finlize is false, we can add a new completion and mark it as accepted
				const acceptedChallenge: ChallengeAccept = {
					...value,
					completions: [...(value.completions ?? []), { completedAt: new Date(), level }]
				};

				return await writeStorage(
					CHALLENGE_INTERACTIONS_COLLECTION,
					`${challenge.slug}`,
					acceptedChallenge,
					version
				);
			}
		} else {
			console.error('Cannot reject a challenge that is already accepted bookmarked etc... ');
			return null;
		}
	}

	const completedChallenge: ChallengeComplete = {
		challengeImpact: challenge.impact,
		challengeTopic: challenge.topic,
		challengeTags: challenge.tags,
		type: 'complete',
		challengeSlug: challenge.slug,
		at: new Date(),
		completedAt: new Date(),
		skipped: true
	};

	return await writeStorage(
		CHALLENGE_INTERACTIONS_COLLECTION,
		`${challenge.slug}`,
		completedChallenge
	);
};

export const getChallengeInteractionsUserData = async (cursor?: string, limit?: number) => {
	return await listStorage(CHALLENGE_INTERACTIONS_COLLECTION, cursor, limit);
};

export const getRejectedChallenges = async (cursor?: string, limit?: number) => {
	const challengeInteractions = await getChallengeInteractionsUserData(cursor, limit);
	const rejectedChallengeInteractions = challengeInteractions.objects
		.filter((storageObject) => {
			if (instanceOfChallengeReject(storageObject.value)) {
				return storageObject.value;
			}
		})
		.map((storageObject) => storageObject.value as ChallengeReject);
	return { interactions: rejectedChallengeInteractions, cursor: challengeInteractions.cursor };
};

export const getCompletedChallenges = async (cursor?: string, limit?: number) => {
	const challengeInteractions = await getChallengeInteractionsUserData(cursor, limit);
	const completedChallengeInteractions = challengeInteractions.objects
		.filter((storageObject) => {
			if (instanceOfChallengeComplete(storageObject.value)) {
				return storageObject.value;
			}
		})
		.map((storageObject) => storageObject.value as ChallengeComplete);
	return { interactions: completedChallengeInteractions, cursor: challengeInteractions.cursor };
};

export const getBookmarkedChallenges = async (cursor?: string, limit?: number) => {
	const challengeInteractions = await getChallengeInteractionsUserData(cursor, limit);
	const bookmarkedChallengeInteractions = challengeInteractions.objects
		.filter((storageObject) => {
			if (instanceOfChallengeBookmark(storageObject.value)) {
				return storageObject.value;
			}
		})
		.map((storageObject) => storageObject.value as ChallengeBookmark);
	return { interactions: bookmarkedChallengeInteractions, cursor: challengeInteractions.cursor };
};

export const getAcceptedChallenges = async (cursor?: string, limit?: number) => {
	const challengeInteractions = await getChallengeInteractionsUserData(cursor, limit);
	const acceptedChallengeInteractions = challengeInteractions.objects
		.filter((storageObject) => {
			if (instanceOfChallengeAccept(storageObject.value)) {
				return storageObject.value;
			}
		})
		.map((storageObject) => storageObject.value as ChallengeAccept);
	return { interactions: acceptedChallengeInteractions, cursor: challengeInteractions.cursor };
};

export const getTopicBigointChallengeState = async (
	topic: string
): Promise<ChallengeInteraction> => {
	console.log('getTopicBigointChallengeState', topic, 'not implemented yet');

	return null;
};
