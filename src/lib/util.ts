import type { Writable } from 'svelte/store';
import type { ImageSource } from './types/challenges';

export const detectLinks = (text: string): string => {
	const regex = /(https?:\/\/[^\s]+)/g;
	return text.replace(regex, (match) => {
		return `<a href="${match}" target="_blank">${match}</a>`;
	});
};

export const randomIntBetween = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mapToRange = (
	value: number,
	min: number,
	max: number,
	outMin: number,
	outMax: number
): number => {
	return ((value - min) * (outMax - outMin)) / (max - min) + outMin;
};

/**
 * why isn't this in the standard library?
 * @param writable A writable store
 * @returns the stores value
 */
export const getState = <T>(writable: Writable<T>): T | null => {
	let state;
	writable.update((value) => {
		state = value;
		return value;
	});
	return state;
};

export const getImageUrlFromChallenge: (ChallengeV2) => string = (challenge) => {
	let imageUrl = 'https://picsum.photos/id/' + randomIntBetween(1, 1000) + '/200/200';

	if (challenge.image !== '') {
		const img: ImageSource = challenge.image;
		if (img.file) {
			return `/${img.file.path}`;
		} else if (img.url) {
			return img.url;
		}
	}

	return imageUrl;
};
