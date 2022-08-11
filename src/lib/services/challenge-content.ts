import type { ChallengeV2 } from '$lib/types/challenges';
import { availableChallenges } from '$testData/challenges';
import { listStorage } from './client-storage-engine';

export const USE_LOCAL_CACHE = import.meta.env.VITE_USE_LOCAL_CACHE === 'true';

const loadChallenges = async () => {
	// console.log('loadChallenges', USE_LOCAL_CACHE);
	if (USE_LOCAL_CACHE) return { objects: availableChallenges };
	else return await listStorage('challenges');
};

export const getChallengesByTag = async (tag: string) => {
	const challenges = await loadChallenges();
	return challenges.objects
		.filter((challenge) => (challenge.value as ChallengeV2)?.tags.includes(tag))
		.map((challenge) => challenge.value as ChallengeV2);
};

export const getChallengesByTopic = async (topic: string) => {
	const challenges = await loadChallenges();
	return challenges.objects
		.filter((challenge) => (challenge.value as ChallengeV2)?.topic === topic)
		.map((challenge) => challenge.value as ChallengeV2);
};

export const getChallenges = async (topic: string) => {
	const challenges = await loadChallenges();
	return challenges.objects
		.filter((challenge) => (challenge.value as ChallengeV2)?.topic === topic)
		.map((challenge) => challenge.value as ChallengeV2);
};

export const getChallengeBySlug = async (slug: string) => {
	const challenges = await loadChallenges();
	const challenge =
		challenges.objects.filter((challenge) => (challenge as ChallengeV2)?.slug === slug)[0] ?? null;
	// console.log('getChallengeBySlug', slug, challenges.objects, challenge);

	return challenge;
};
