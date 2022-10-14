import PocketBase from 'pocketbase';
import { pb } from '$lib/pb-client';
import type { ChallengeV2 } from '$lib/types/challenges';
import { availableChallenges } from '$testData/challenges';
import { listStorage } from './client-storage-engine';
import { writable } from 'svelte/store';
import { challengeListCache, type ChallengeCache } from '$lib/stores/challenge-store';

export const USE_LOCAL_CACHE = import.meta.env.VITE_USE_LOCAL_CACHE === 'true';

export let ttl = 360;

export const findRecord = async (searchParam, TTL = ttl) => {
	let queryParams = { filter: `"slug" = "${searchParam}"`, expand: 'topic, tags' };
	return (
		pb
			.send(`find/${searchParam}`, { expand: 'topic, tags' })
			//records.getFullList('challenges', 1, queryParams)
			.then((ch) => ch)
	);
};



const fetchFromCache = async (params = '', offset = 0, limit = 100) => {
	let stale = false;
	let data = [];

	// get current cache value and check if its stale
	challengeListCache.update((value) => {
		let subset: ChallengeCache = params === '' ? value['*'] : value[params] ?? undefined;
		if (!subset) {
			stale = true;
			return value;
		}

		if (subset.data.length == 0) {
			stale = true;
			return value;
		}

		if (Date.now() - subset.lastwrite > ttl) {
			stale = true;
			return value;
		}
		data = subset.data;
		return value;
	});

	// if cache is still valid return it
	if (!stale) {
		return data;
	}

	// fetch new data for stale cache
	data = await fetchChallenges(params, offset, limit);

	challengeListCache.update((value) => {
		const cacheEntry = {
			lastwrite: Date.now(),
			data: data
		};
		if (params === '') {
			value['*'] = cacheEntry;
		} else {
			value[params] = cacheEntry;
		}

		return value;
	});

	return data;
};

export const inlineRelationsChallengeRecord = (challengeRecord) => {
	challengeRecord.topic = challengeRecord['@expand'].topic.topic;
	challengeRecord.tags = challengeRecord['@expand'].tags?.map((tag) => tag.tag) ?? [];
	return (challengeRecord as unknown) as ChallengeV2;
};

const fetchChallenges = async (params = '', offset = 0, limit = 100): Promise<ChallengeV2[]> =>
	pb.records
		.getList('challenges', offset, limit, { expand: 'topic, tags', filter: `${params}` })
		.then((challengesPage) =>
			challengesPage.items.map((challengeRecord) => inlineRelationsChallengeRecord(challengeRecord))
		);

export const getChallenges = async () => {
	try {
		const challenges = await fetchChallenges();
		console.log('Challenge fetch result:', challenges.length);
		return challenges;
	} catch (e) {
		console.error('PocketBase failed fetch:', e);
	}
};

export const getChallengeBySlug = async (slug: string) => {
	return findRecord(slug);
};

export const getChallengesByTag = async (tagId: string, offset = 0, limit = 100) => {
	try {
		const challenges = await fetchChallenges(`tag=\"${tagId}\"`, offset, limit);
		console.log('Challenge fetch result:', challenges);
		return challenges;
	} catch (e) {
		console.error('PocketBase failed fetch:', e);
	}
};

export const getChallengesByTopic = async (topicId: string, offset = 0, limit = 100) => {
	try {
		const challenges = await fetchChallenges(`topic=\"${topicId}\"`, offset, limit);
		console.log('Challenge fetch result:', challenges);
		return challenges;
	} catch (e) {
		console.error('PocketBase failed fetch:', e);
	}
};
