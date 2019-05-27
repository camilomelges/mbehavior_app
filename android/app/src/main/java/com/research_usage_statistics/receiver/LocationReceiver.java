package com.mbehaviorapp.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.mbehaviorapp.services.LocationService;

public final class LocationReceiver extends BroadcastReceiver {

    private static volatile boolean receiversRegistered = false;

    public final void onReceive(Context context, Intent intent) {
        if (receiversRegistered) return;
        receiversRegistered = true;

        Log.d("ReactNative", "LocationReceiver");

        Intent LocationServiceIntent = new Intent(context, LocationService.class);
        context.startService(LocationServiceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}