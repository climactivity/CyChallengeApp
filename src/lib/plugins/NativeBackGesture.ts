import { registerPlugin } from '@capacitor/core';

export interface NativeBackGesturePlugin {
    enable(): Promise<void>
    disable(): Promise<void>
}

const NativeBackGesturePlugin = registerPlugin<NativeBackGesturePlugin>('NativeBackGesture')

export default NativeBackGesturePlugin;