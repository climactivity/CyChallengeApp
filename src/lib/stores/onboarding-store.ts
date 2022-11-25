export type OnboardingState = {
	hasOnboarded?: boolean;
	skipped?: boolean;
};

import { browser } from '$app/env';
import { goto, prefetch } from '$app/navigation';
import { writable } from 'svelte/store';

const LS_KEY_ONBOARDING = 'cy-onboarding';
const LS_KEY_TUTORIAL = 'cy-onboarding-tutorial';
const initialValue = browser ? window.localStorage.getItem(LS_KEY_ONBOARDING) ?? false : false;
let currentValue = initialValue ? JSON.parse(initialValue) : {};
export const onboarding = writable<OnboardingState>(currentValue);

onboarding.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(LS_KEY_ONBOARDING, JSON.stringify(value));
		currentValue = value;
	}
});

export const onboardingGuard = async () => {
	let onboardingOverride = import.meta.env.VITE_ONBOARD;
	console.log('onbording? ', onboardingOverride);
	if (onboardingOverride === 'always') {
		goto('/welcome');
	} else if (onboardingOverride === 'skip' || currentValue.hasOnboarded) {
		try {
			await prefetch('/impact');
			goto('/impact');
		} catch (e) {
			console.log('onboardingGuard', e);
		}
	} else {
		goto('/welcome');
	}
};

export const tutorialStore = writable<boolean>(false);

tutorialStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(LS_KEY_TUTORIAL, JSON.stringify(value));
		currentValue = value;
	}
});

if (browser) {
	let tutorialState;

	if (import.meta.env.VITE_ALWAYS_SHOW_TUTORIAL === true) {
		tutorialState = false;
	} else {
		tutorialState = !!window.localStorage.getItem(LS_KEY_TUTORIAL);
	}

	console.log(tutorialState);
	tutorialStore.set(tutorialState);
}
