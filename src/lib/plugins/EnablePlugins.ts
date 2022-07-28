import { Capacitor } from "@capacitor/core";
import NativeBackGesturePlugin from "./NativeBackGesture";
const enablePlugins = async () => {
    if (Capacitor.getPlatform() === "ios") {
        console.log("Registering iOS plugins");
        NativeBackGesturePlugin
            .enable()
            .then(() => {console.log("NativeBackGesturePlugin enabled");})
            .catch((e) => {console.error("NativeBackGesturePlugin error: " + e);});
    }
}

export default enablePlugins; 