import { writable } from 'svelte/store';

export type ButtonAlert = {
	path: string;
	type: 'attention' | 'badge';
	value?: string;
};

export const buttonAlerts = writable<ButtonAlert[]>([]);
