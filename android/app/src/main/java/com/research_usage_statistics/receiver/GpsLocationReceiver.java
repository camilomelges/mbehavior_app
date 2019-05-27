package com.mbehaviorapp.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.mbehaviorapp.services.LocationService;
import com.facebook.react.HeadlessJsTaskService;

public class GpsLocationReceiver extends BroadcastReceiver {        
    
    public final void onReceive(Context context, Intent intent) {
        Log.d("ReactNative", "GpsLocationReceiver");

        Intent LocationServiceIntent = new Intent(context, LocationService.class);
        context.startService(LocationServiceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}