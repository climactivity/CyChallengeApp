import { registerPlugin } from '@capacitor/core';

export interface NativeBackGesturePlugin {
    enable(): Promise<{error: number}>
    disable(): Promise<{error: number}>
}

const NativeBackGesturePlugin = registerPlugin<NativeBackGesturePlugin>('NativeBackGesture')

export default NativeBackGesturePlugin;