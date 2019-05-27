package com.mbehaviorapp.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.mbehaviorapp.services.LaunchAppService;
import com.facebook.react.HeadlessJsTaskService;
import com.rvalerio.fgchecker.AppChecker;

public final class LaunchAppReceiver extends BroadcastReceiver {

    public static volatile boolean receiversRegistered = false;

    public final void onReceive(Context context, Intent intent) {
        Log.d("ReactNative", "LaunchAppReceiver");
        if (receiversRegistered) return;
        receiversRegistered = true;
        
        Log.d("ReactNative", "LaunchAppReceiver");

        final Context finalContext = context;
        final Intent LaunchAppServiceIntent = new Intent(finalContext, LaunchAppService.class);
        finalContext.startService(LaunchAppServiceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(finalContext);
    }

}