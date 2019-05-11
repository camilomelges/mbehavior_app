package com.research_usage_statistics.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.research_usage_statistics.MainApplication;
import com.facebook.react.HeadlessJsTaskService;
import com.rvalerio.fgchecker.AppChecker;

import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.research_usage_statistics.services.LocationService;
import android.content.Context;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;
import org.json.JSONObject;
import org.json.JSONException;
import com.rvalerio.fgchecker.AppChecker;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;

public final class LocationReceiver extends BroadcastReceiver {

    public final void onReceive(Context context, Intent intent) {
        
        // LocationListener listener = new LocationListener() {
        //     @Override
        //     public void onLocationChanged(Location location) {
        //     //   Intent myIntent = new Intent(context, LocationService.class);
        //     //   context.startService(myIntent);
        //     //   HeadlessJsTaskService.acquireWakeLockNow(context);
        //     }
        
        //     @Override
        //     public void onStatusChanged(String provider, int status, Bundle extras) {
        //     }
        
        //     @Override
        //     public void onProviderEnabled(String provider) {
        //     }
        
        //     @Override
        //     public void onProviderDisabled(String provider) {
        //     }
        // };
    }

}