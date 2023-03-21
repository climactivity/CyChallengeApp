import type { Writable } from 'svelte/store';
import type { ChallengeV2 } from './types/challenges';

export const detectLinks = (text: string): string => {
	const regex = /((http|https)?:\/\/[^\s]+)/g;
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

export const getImageUrlFromChallenge = (challenge: ChallengeV2, thumbnail = false) => {
	if (challenge.image !== '') {
		const imageUrl = pb.records.getFileUrl(
			challenge,
			challenge.image,
			thumbnail ? { thumb: '512x512' } : {}
		);
		// console.log('IMG:', imageUrl);
		return imageUrl;
		// } else {
		// 	if (challenge.image !== '') {
		// 		return '/images/not-found.webp';
		// 	}

		// 	const img: ImageSource = challenge.image as ImageSource;
		// 	if (img.file) {
		// 		if (thumbnail) {
		// 			return `/${img.thumb.path}`;
		// 		}
		// 		return `/${img.file.path}`;
		// 	} else if (img.url) {
		// 		return img.url;
		// 	}
	}

	return '/images/not-found.webp';
};

import type { ValidationError } from 'yup';
import { pb } from './pb-client';

type ErrorObject = {
	[field: string]: string;
};

export function yupErrorToErrorObject(err: ValidationError): ErrorObject {
	const object: ErrorObject = {};

	err.inner.forEach((x) => {
		if (x.path !== undefined) {
			object[x.path] = x.errors[0];
		}
	});

	return object;
}
