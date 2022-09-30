import { browser } from '$app/env';
import { Capacitor } from '@capacitor/core';
import type { OneSignalPlugin } from 'onesignal-cordova-plugin';
import { client, session } from './client';
import { writeStorage } from './services/client-storage-engine';
import { notificationSettingsStore } from './stores/notification-config';

let OneSignal: OneSignalPlugin;

let isSubscribed = false;
export const armSoftNotificationTrigger: () => Promise<void> = async () => {
	if (!Capacitor.isNativePlatform()) return;

	if (!OneSignal) {
		await oneSignalInit();
	}

	if (isSubscribed) return;

	OneSignal.addTrigger('firstChallenge', true);
};

export const oneSignalInit: () => Promise<void> = async () => {
	if (!browser) {
		return;
	}
	console.log('initing onesignal...');
	let { default: OneSignalPlugin } = await import('onesignal-cordova-plugin');
	OneSignal = OneSignalPlugin;
	if (!Capacitor.isNativePlatform()) {
		console.log(
			'Push notifications are only configured for mobile platforms, skipping on',
			Capacitor.getPlatform()
		);
		return;
	}

	console.log('onesignal module loaded');

	//OneSignal.setLogLevel(6, 0);

	// NOTE: Update the setAppId value below with your OneSignal AppId.
	OneSignal.setAppId('650d8665-e57a-4488-9bab-5057d8fc358c');
	OneSignal.setNotificationOpenedHandler(function (jsonData) {
		console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	});

	// *** obsoleted by soft prompt via one signal in app message service! ***
	// Prompts the user for notification permissions.
	//    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
	// OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
	// 	console.log('User accepted notifications: ' + accepted);
	// });

	OneSignal.addSubscriptionObserver((event) => {
		console.log('Onesignal Subscription changed:', event);
		writeStorage('notification-settings', 'onesignal-settings', event.to);
	});
};

export const scheduleNotification = async (payload, at): Promise<string> => {
	let osId;
	notificationSettingsStore.update((value) => {
		osId = value.oneSignalSettings?.userId;
		return value;
	});

	if (Capacitor.isNativePlatform() && osId) {
		const res = await client.rpc(session, 'schedule_one_signal_notification', {
			recipient_player_id: osId,
			payload,
			at
		});
		if (res.payload) {
			const notificationId = res.payload['notificaion_id'] ?? null;
			if (notificationId != null) {
				return notificationId;
			}
		}
	}
};
