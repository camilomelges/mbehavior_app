package com.research_usage_statistics.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.research_usage_statistics.services.LaunchAppService;
import com.facebook.react.HeadlessJsTaskService;
import com.rvalerio.fgchecker.AppChecker;

public final class LaunchAppReceiver extends BroadcastReceiver {

    private static volatile boolean receiversRegistered = false;

    public final void onReceive(Context context, Intent intent) {
        if (receiversRegistered) return;
        // ((MainApplication) this.getApplication()).getActualPackage("foo");

        // // get
        // String s = ((MainApplication) this.getApplication()).setActualPackage();
        Log.d("ReactNative", "LaunchAppReceiver");
        // Intent myIntent = new Intent(context, LaunchAppService.class);
        // context.startService(myIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
        receiversRegistered = true;
        
        AppChecker appChecker = new AppChecker();
        appChecker.whenAny(new AppChecker.Listener() {
            @Override
            public void onForeground(String packageName) {
                Log.d("ReactNative", packageName);
            }
        }).timeout(10000).start(context);
    }

}