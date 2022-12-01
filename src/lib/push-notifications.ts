import { browser } from '$app/env';
import { Capacitor } from '@capacitor/core';
import type { StorageObject } from '@heroiclabs/nakama-js';
import type { OneSignalPlugin } from 'onesignal-cordova-plugin';
import type { ChangeEvent } from 'onesignal-cordova-plugin/dist/Subscription';
import { client, makeRpc, session } from './client';
import { dropStorage, readStorage, writeStorage } from './services/client-storage-engine';
import { notificationSettingsStore } from './stores/notification-config';

let OneSignal: OneSignalPlugin;

export type OneSignalSettings = {
	isPushDisabled: boolean;
	isSubscribed: boolean;
	pushToken: string;
	userId: string;
};

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

	OneSignal.addSubscriptionObserver(async (event) => {
		console.log('Onesignal Subscription changed:', event);
		await writeStorage('notification-settings', 'onesignal-settings', event.to);
	});
};

/**
 * removes a notification (by id) from onesingals schedule
 * @param context the context the notification is scheduled for
 * @param notificationId the notification to remove
 */
export const unscheduleNotification = async (context) => {
	console.log(`Unschedule notification ${context}`);
	const previousContext = await readStorage('planned-notifications', context);

	if (!previousContext) {
		console.warn('No prior message to unscheduled!');
		return Promise.reject('No notification for context found!');
	}

	console.log('previousContext:', previousContext);

	const storedNotification: { notificationId?: string } = (previousContext as StorageObject).value;
	const res = await makeRpc('unschedule_one_signal_notification', {
		notification_id: storedNotification.notificationId
	});
	console.log('previousContext response:', res);

	if (res.payload) {
		const success = res.payload['success'] ?? false;
		if (success) {
			const dropped = await dropStorage('planned-notifications', context);
			console.log(`Deleted notification ${context}? ${dropped}`);
			return dropped;
		} else {
			console.error('Notification was not unscheduled!');
			return Promise.reject('Notification was not unscheduled!');
		}
	} else {
		console.error('RPC unschedule_one_signal_notification failed!');
		return Promise.reject('RPC unschedule_one_signal_notification failed!');
	}
};

/**
 * Schedule a notification
 * @param payload notification text
 * @param at when to deliver (may be changed by onesignals user targeting policy to something more timezone appropriate)
 * @param context why is this notification sent? challenges must set this to challenge.slug
 * @returns the notification id
 */
export const scheduleNotification = async (payload, at, context: string): Promise<string> => {
	if (!Capacitor.isNativePlatform())
		return Promise.reject('Notifications are only supported on mobile devices!');

	// check if notifications are enabled
	const oneSignalSettingsStorage = await readStorage('notification-settings', 'onesignal-settings');
	const oneSignalSettings = (oneSignalSettingsStorage as StorageObject).value as OneSignalSettings;
	const osId = oneSignalSettings.userId;
	if (!osId) return Promise.reject('Notifications are not configured!');

	// check if a previous notification has been scheduled for the current context, i.e.
	// the same challenge or similar
	// if so, the old notification has to be unscheduled from onesignal
	if (await unscheduleNotification(context).catch(console.warn)) {
		console.log('dropped old notificaion_id');
	}

	try {
		console.log(`Schedule notification ${payload} at ${at} about ${context} for ${osId}!`);
		const res = await makeRpc('schedule_one_signal_notification', {
			recipient_player_id: osId,
			payload,
			at,
			challenge_slug: context
		});
		console.log(JSON.stringify(res));
		if (res.payload) {
			const notificationId = res.payload['id'] ?? null;
			if (notificationId != null) {
				await writeStorage('planned-notifications', context, { notificationId });
				return notificationId;
			} else {
				console.error('Notification was not scheduled!');
				return Promise.reject('Notification was not scheduled!');
			}
		} else {
			console.error('RPC schedule_one_signal_notification failed!');
			return Promise.reject('RPC schedule_one_signal_notification failed!!');
		}
	} catch (e) {
		console.error(`Failed to schedule notification: ${JSON.stringify(e)}!`);
		return Promise.reject(e);
	}
};
