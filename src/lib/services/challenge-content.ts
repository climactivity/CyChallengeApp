import type { ChallengeV2 } from '$lib/types/challenges';
import { listStorage } from './client-storage-engine';

export const getChallengesByTag = async (tag: string) => {
	const challenges = await listStorage('challenges');
	return challenges.objects
		.filter((challenge) => (challenge.value as ChallengeV2)?.tags.includes(tag))
		.map((challenge) => challenge.value as ChallengeV2);
};

export const getChallengesByTopic = async (topic: string) => {
	const challenges = await listStorage('challenges');
	return challenges.objects
		.filter((challenge) => (challenge.value as ChallengeV2)?.topic === topic)
		.map((challenge) => challenge.value as ChallengeV2);
};

export const getChallenges = async (topic: string) => {
	const challenges = await listStorage('challenges');
	return challenges.objects
		.filter((challenge) => (challenge.value as ChallengeV2)?.topic === topic)
		.map((challenge) => challenge.value as ChallengeV2);
};
