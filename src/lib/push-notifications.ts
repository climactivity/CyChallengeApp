import { browser } from "$app/env";
import { Capacitor } from "@capacitor/core";
import type { OneSignalPlugin } from "onesignal-cordova-plugin";
import { writeStorage } from "./services/client-storage-engine";

export let OneSignal: OneSignalPlugin
let isSubscribed = false
export const armSoftNotificationTrigger: () => void = () => {
    if (isSubscribed) return
    OneSignal.addTrigger("firstChallenge", true);
}


export const oneSignalInit: () => Promise<void> = async () => {
    const platform = Capacitor.getPlatform()
    if(!browser){
        return
    }
    console.log("initing onesignal...")
    let {default: OneSignalPlugin} = await import('onesignal-cordova-plugin')
    OneSignal = OneSignalPlugin; 
    if (!(platform === 'ios')) {
        console.log("Push notifications are only configured for mobile platforms, skipping on", platform)
        return
    }

    console.log("onesignal module loaded")

    //OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId("650d8665-e57a-4488-9bab-5057d8fc358c");
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });

    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    // OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
    //     console.log("User accepted notifications: " + accepted);
    // });

    OneSignal.addSubscriptionObserver((event)=> {
        console.log("Onesignal Subscription changed:", event)
        writeStorage("notification-settings", "onesignal-settings", event.to)
        if(event.to.isSubscribed) {

        }
    })
}

