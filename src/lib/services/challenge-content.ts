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
	const challenges = await loadChallenges();
	const challenge =
		challenges.filter((challenge) => (challenge as ChallengeV2)?.slug === slug)[0] ?? null;
	// console.log('getChallengeBySlug', slug, challenges.objects, challenge);

	return challenge;
};

export const getChallengesByTag = async (tag: string) => {
	const challenges = await loadChallenges();
	return challenges
		.filter((challenge) => (challenge.value as ChallengeV2)?.tags.includes(tag))
		.map((challenge) => challenge.value as ChallengeV2);
};

export const getChallengesByTopic = async (topic: string) => {
	const challenges = await loadChallenges();
	return challenges
		.filter((challenge) => (challenge.value as ChallengeV2)?.topic === topic)
		.map((challenge) => challenge.value as ChallengeV2);
};
