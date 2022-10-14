import { writable } from 'svelte/store';
export type ChallengeCache = {
	data: any[];
	lastwrite: number;
};
export const challengeListCache = writable({
	'*': {
		lastwrite: Date.now(),
		data: []
	}
});
