//
//  NativeBackGesturePlugin.swift
//  App
//
//  Created by Timo Volk on 28.07.22.
//

import Foundation
import Capacitor

@objc(NativeBackGesturePlugin)
public class NativeBackGesturePlugin: CAPPlugin {
    @objc func enable(_ call: CAPPluginCall) {
        self.bridge?.webView?.allowsBackForwardNavigationGestures = true
        call.resolve([
            "error": 0
        ]);
    }
    
    @objc func disable(_ call: CAPPluginCall) {
        self.bridge?.webView?.allowsBackForwardNavigationGestures = false
        call.resolve([
            "error": 0
        ]);
    }
}
