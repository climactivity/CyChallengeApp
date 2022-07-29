import { Capacitor } from '@capacitor/core';
import NativeBackGesturePlugin from './NativeBackGesture';
const enablePlugins = async () => {
	if (
		Capacitor.getPlatform() === 'ios' &&
		import.meta.env.VITE_IOS_NATIVE_BACK_FORWARD === 'true'
	) {
		console.log('Registering iOS plugins');
		NativeBackGesturePlugin.enable()
			.then(() => {
				console.log('NativeBackGesturePlugin enabled');
			})
			.catch((e) => {
				console.error('NativeBackGesturePlugin error: ' + e);
			});
	}
};

export default enablePlugins;
