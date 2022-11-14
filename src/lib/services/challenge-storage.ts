import type { ChallengeV2, Difficulties, Difficulty } from '$lib/types/challenges';
import {
	dropStorage,
	listStorage,
	readManyStorage,
	readStorage,
	writeStorage
} from './client-storage-engine';
import { DateTime } from 'luxon';
import type { StorageObject, StorageObjects } from '@heroiclabs/nakama-js';
import { armSoftNotificationTrigger } from '$lib/push-notifications';
import { notificationSettingsStore } from '$lib/stores/notification-config';
import { Capacitor } from '@capacitor/core';
import { client, nkReady, session } from '$lib/client';
import { update_await_block_branch } from 'svelte/internal';
import { object } from 'yup';
import { rewardStore } from '$lib/stores/reward-store';
import { challenges } from '$testData/challenges';

export type DifficultyName = string;

export type ChallengeInteractionType = 'accept' | 'bookmark' | 'complete' | 'reject';
export type ChallengeImpact = 'bigpoint' | 'peanut';
export type ChallengeType = 'one-time' | 'recurring' | 'repeatable';
export type CompletedStep = {
	name: string;
	reward?: any;
	completed: boolean;
	completedAt: Date;
};

export type ChallengeCompletion = {
	completedAt: Date;
	level: DifficultyName;
	completedSteps?: CompletedStep[];
	accScore?: number;
};
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
	challengeType: ChallengeType;
	nextNotification?: Date | null;
	nextCheckpoint: Date | null;
	notificationId?: string;
	currentLevel: DifficultyName;
	completions?: ChallengeCompletion[];
	accScore?: number;
	lastDifficulty?: DifficultyName;
	currentSteps: CompletedStep[];
}

export interface ChallengeComplete extends ChallengeInteraction {
	type: 'complete';
	completedAt: Date;
	skipped: boolean;
	completions?: ChallengeCompletion[];
	accScore?: number;
	lastDifficulty: DifficultyName;
}

export function instanceOfChallengeBookmark(value): value is ChallengeBookmark {
	if (value == undefined || value == null) return false;
	return 'type' in value && value.type === 'bookmark';
}

export function instanceOfChallengeReject(value): value is ChallengeReject {
	if (value == undefined || value == null) return false;

	return 'type' in value && value.type === 'reject';
}

export function instanceOfChallengeAccept(value): value is ChallengeAccept {
	if (value == undefined || value == null) return false;

	return 'type' in value && value.type === 'accept';
}

export function instanceOfChallengeComplete(value): value is ChallengeComplete {
	if (value == undefined || value == null) return false;

	return 'type' in value && value.type === 'complete';
}

const compareDifficulty = (a: DifficultyName, b: DifficultyName) => {
	if (a === b) return 0;
	return a > b ? -1 : 1;

	// if (a === 'easy') {
	// 	return b === 'easy' ? 0 : -1;
	// } else if (a === 'medium') {
	// 	return b === 'easy' ? 1 : b === 'medium' ? 0 : -1;
	// } else {
	// 	return b === 'easy' ? 1 : b === 'medium' ? 1 : b === 'hard' ? 0 : -1;
	// }
};

export const CHALLENGE_INTERACTIONS_COLLECTION = 'challenge-interactions';

const highestCompletion = (completions: ChallengeCompletion[], levels: Difficulty[]) => {
	return completions.reduce((acc, cur) => {
		return compareDifficulty(acc, cur.level) > 0 ? acc : cur.level;
	}, levels[0].name);
};

export const nextLevelForChallenge = (challenge: ChallengeV2, challengeState): DifficultyName => {
	const levelsArr = Object.values(challenge.difficulties);

	console.log('nextLevelForChallenge 1', levelsArr, challenge);
	// challenge is incomplete and has no todos
	if (!levelsArr || levelsArr.length == 0) {
		console.warn('Loaded challenge without levels!');
		return null;
	}

	// challenge has only one level, no next level can be selected
	if (levelsArr.length <= 1) {
		return null;
	}

	if (!challengeState) {
		console.log('nextLevelForChallenge 2', levelsArr[1].name);
		return levelsArr[1].name;
	}

	if (challengeState.type === 'completed') {
		return null;
	}

	const currentLevel = currentLevelForChallenge(challenge, challengeState);

	console.log('nextLevelForChallenge 3', currentLevel);

	if (currentLevel == null) {
		return levelsArr[1].name;
	}

	if (challengeState.type === 'accept') {
		const { completions } = challengeState as ChallengeAccept;
		if (completions === undefined) {
			return levelsArr[1].name;
		}
		const _completion = highestCompletion(completions, levelsArr);
		const position = levelsArr.findIndex((v) => v.name === _completion);
		if (position < levelsArr.length - 1) {
			return levelsArr[position + 1].name;
		}
		return null;
	}
};

export const currentLevelForChallenge = (
	challenge: ChallengeV2,
	challengeState
): DifficultyName => {
	const levelsArr = Object.values(challenge.difficulties);

	// challenge is incomplte and has no todos
	if (!levelsArr || levelsArr.length == 0) {
		console.warn('Loaded challenge without levels!');
		return null;
	}
	if (!challengeState) return levelsArr[0].name;

	// challenge is completed, show no more todos
	if (challengeState.type === 'completed') {
		return challengeState.currentLevel;
	}

	// challenge has not yet been started, so show the lowest diffifculty
	if (null || challengeState.type === 'bookmark' || challengeState.type === 'reject') {
		return levelsArr[0].name;
	}

	// challenge has been accepted, show the current difficulty
	if (challengeState.type === 'accept') {
		return challengeState.currentLevel;

		const { completions } = challengeState as ChallengeAccept;

		// challenge has been accepted, but no previous levels have been completed
		if (completions === undefined) {
			return levelsArr[0].name;
		}

		// challenge has been completed before,find the highest completion so far
		return highestCompletion(completions, levelsArr);
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
			// console.log(acc, cur.completedAt, curDT);
			if (curDT.ts > acc.ts) {
				// console.log('returning', curDT);
				return curDT;
			}
			return acc;
			// return curDT > acc ? curDT : acc;
		}, DateTime.fromISO('1970-01-01T00:00:00.000Z'));

		console.log('last', last);
		return last;
	}
};

export const getChallengeUserDataSummary = async () => {
	// this whole thing is stupid and should be precomputed/chached on the server

	console.log('getChallengeUserDataSummary');

	let isConnected = false;
	nkReady.update((state) => {
		isConnected = state;
		return state;
	});

	if (!isConnected) {
		rewardStore.update((updater) => {
			updater.medal = 0;
			return updater;
		});
		return;
	}
	const challengeStatesList = await listStorage(CHALLENGE_INTERACTIONS_COLLECTION);
	const challengeStatesObjects = await readManyStorage(challengeStatesList.objects);
	if ((challengeStatesObjects as Error).cause) {
		throw Error;
	}
	const challengeStates = (challengeStatesObjects as StorageObjects).objects;

	// count medals
	const medals = challengeStates
		.map((object) => {
			const interaction = object.value as ChallengeInteraction;
			if (instanceOfChallengeComplete(interaction)) {
				return Math.max(1, Math.floor((interaction.completions?.length ?? 0) / 6));
			} else if (instanceOfChallengeAccept(interaction)) {
				return Math.floor((interaction.completions?.length ?? 0) / 6);
			}
			return 0;
		})
		.reduce((acc, value) => acc + value, 0);

	rewardStore.update((updater) => {
		updater.medal = medals;
		return updater;
	});

	return medals;
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
	difficulty: DifficultyName,
	nextCheckpoint?: Date
) => {
	const challengeState = await getChallengeUserData(challenge.slug);
	armSoftNotificationTrigger();
	let acceptedChallenge: ChallengeAccept = {
		type: 'accept',
		challengeSlug: challenge.slug,
		challengeImpact: challenge.impact,
		challengeTopic: challenge.topic,
		challengeTags: challenge.tags,
		currentSteps: [],
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
			// return await writeStorage(
			// 	CHALLENGE_INTERACTIONS_COLLECTION,
			// 	`${challenge.slug}`,
			// 	acceptedChallenge,
			// 	version
			// );
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
				currentSteps: [],
				type: 'accept',
				nextCheckpoint,
				challengeType: challenge.type ?? 'recurring',
				currentLevel: difficulty
			};
			// return await writeStorage(
			// 	CHALLENGE_INTERACTIONS_COLLECTION,
			// 	`${challenge.slug}`,
			// 	acceptedChallenge,
			// 	version
			// );
		} else {
			// return await writeStorage(
			// 	CHALLENGE_INTERACTIONS_COLLECTION,
			// 	`${challenge.slug}`,
			// 	acceptedChallenge,
			// 	version
			// );
		}
	} else {
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

export const completeChallenge = async (challenge: ChallengeV2, level, finalize = false) => {
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
					accScore: value.accScore ?? 0 + challenge.score,
					lastDifficulty: level,
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
					lastDifficulty: level,

					accScore: value.accScore ?? 0 + challenge.score,

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
					lastDifficulty: level,
					currentSteps: [],
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
		skipped: true,
		lastDifficulty: level,

		accScore: 0 + challenge.score
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
	console.log(challengeInteractions);
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
	const { objects: interactions } = await getChallengeInteractionsUserData();
	const filteredInteractions = interactions
		.map(({ value }) => value as ChallengeInteraction)
		.filter((value) => value.challengeTopic === topic && value.challengeImpact !== 'peanut');

	if (filteredInteractions.length > 0) {
		return filteredInteractions[0];
	}

	return undefined;
};

export const stepCompleted = (challengeInteraction, step) => {
	if (instanceOfChallengeAccept(challengeInteraction)) {
		if (!challengeInteraction.currentSteps) {
			challengeInteraction.currentSteps = [];
		}
		return !!challengeInteraction.currentSteps.find((cs) => cs.name === step.name);
	}
};

export const completeStep = async (
	challengeInteraction: ChallengeAccept,
	step: { name: string; reward?: any }
) => {
	const challengeState = await getChallengeUserData(challengeInteraction.challengeSlug);
	challengeInteraction.currentSteps = challengeInteraction.currentSteps ?? [];

	if (stepCompleted(challengeInteraction, step)) {
		challengeInteraction.currentSteps = challengeInteraction.currentSteps.filter(
			(cs) => cs.name !== step.name
		);
	} else {
		const completed: CompletedStep = {
			...step,
			completed: true,
			completedAt: new Date()
		};

		challengeInteraction.currentSteps = [...challengeInteraction.currentSteps, completed];
		// console.log('completeStep', challengeInteraction);
	}

	let res: StorageObject = await writeStorage(
		CHALLENGE_INTERACTIONS_COLLECTION,
		`${challengeInteraction.challengeSlug}`,
		challengeInteraction,
		challengeState.version
	);

	console.log(res);
	return challengeInteraction;
};
