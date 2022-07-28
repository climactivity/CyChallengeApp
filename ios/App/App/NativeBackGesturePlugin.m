//
//  NativeBackGesturePlugin.m
//  App
//
//  Created by Timo Volk on 28.07.22.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(NativeBackGesturePlugin, "NativeBackGesture",
           CAP_PLUGIN_METHOD(enable, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disable, CAPPluginReturnPromise);
           );
