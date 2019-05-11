package com.research_usage_statistics;

import com.research_usage_statistics.packages.*;

import com.facebook.react.ReactActivity;
import java.util.Arrays;
import java.util.List;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.content.DialogInterface;
import android.app.AlertDialog;
import com.research_usage_statistics.services.LaunchAppService;
import android.content.Context;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;
import org.json.JSONObject;
import org.json.JSONException;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;
import android.support.v4.content.ContextCompat;
import android.content.pm.PackageManager;
import android.util.Log;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import com.research_usage_statistics.services.ForegroundAppService;
import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.research_usage_statistics.services.LocationService;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "research_usage_statistics";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    LocationListener listener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
          Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
    
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getApplicationContext().startForegroundService(myIntent);
          } else {
            getApplicationContext().startService(myIntent);
          }
    
          HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
        }
    
        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
        }
    
        @Override
        public void onProviderEnabled(String provider) {
        }
    
        @Override
        public void onProviderDisabled(String provider) {
        }
      };

    @Override
    protected void onStart() {
        super.onStart();

        if (ContextCompat.checkSelfPermission(getApplicationContext(),
                android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            Log.d("ReactNative", "sim");
            LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            // Start requesting for location
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);
        }

        Intent myIntent = new Intent(getApplicationContext(), LaunchAppService.class);
        getApplicationContext().startService(myIntent);
        HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());

        if (UsageStatsModule.getUsageStatsList(this).isEmpty()) {
            AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
            alertDialog.setTitle("Olá");
            alertDialog.setMessage("Para usar nosso app é necessário que você nos de acesso de uso no seu celular");
            alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int which) {
                    startActivity(new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS));
                }
            });
            alertDialog.show();
        }
    }
}
