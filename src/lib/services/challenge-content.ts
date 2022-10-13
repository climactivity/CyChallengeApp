import PocketBase from 'pocketbase';
import { pb } from '$lib/pb-client';
import type { ChallengeV2 } from '$lib/types/challenges';
import { availableChallenges } from '$testData/challenges';
import { listStorage } from './client-storage-engine';

export const USE_LOCAL_CACHE = import.meta.env.VITE_USE_LOCAL_CACHE === 'true';

export const findRecord = async (searchParam) => {
	return pb.send(`find/${searchParam}`, {});
};

export const inlineRelationsChallengeRecord = (challengeRecord) => {
	challengeRecord.topic = challengeRecord['@expand'].topic.topic;
	challengeRecord.tags = challengeRecord['@expand'].tags?.map((tag) => tag.tag) ?? [];
	return (challengeRecord as unknown) as ChallengeV2;
};

const fetchChallenges = async (params): Promise<ChallengeV2[]> =>
	pb.records
		.getList('challenges', 0, 100, { expand: 'topic, tags', ...params })
		.then((challengesPage) =>
			challengesPage.items.map((challengeRecord) => inlineRelationsChallengeRecord(challengeRecord))
		);

export const getChallenges = async () => {
	try {
		const challenges = await fetchChallenges({});
		console.log('Challenge fetch result:', challenges);
		return challenges;
	} catch (e) {
		console.error('PocketBase failed fetch:', e);
	}
};

export const getChallengeBySlug = async (slug: string) => {
	return findRecord(slug);
};

export const getChallengesByTag = async (tagId: string) => {
	try {
		const challenges = await fetchChallenges({ tags: tagId });
		console.log('Challenge fetch result:', challenges);
		return challenges;
	} catch (e) {
		console.error('PocketBase failed fetch:', e);
	}
};

export const getChallengesByTopic = async (topicId: string) => {
	try {
		const challenges = await fetchChallenges({ topic: topicId });
		console.log('Challenge fetch result:', challenges);
		return challenges;
	} catch (e) {
		console.error('PocketBase failed fetch:', e);
	}
};
