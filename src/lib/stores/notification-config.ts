import { writable } from 'svelte/store';

export type NotificationSettings = {
	notification_frequency: 0 | 1 | 2;

	oneSignalSettings?: {
		isSubscribed: boolean;
		isPushDisabled: boolean;
		push_token: string;
		userId: string;
	};
};

export const notificationSettingsStore = writable<NotificationSettings>({
	notification_frequency: 2
});
