package com.mbehaviorapp;

import com.mbehaviorapp.packages.*;

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
import com.mbehaviorapp.services.LaunchAppService;
import com.mbehaviorapp.receiver.LaunchAppReceiver;
import android.content.Context;
import com.facebook.react.HeadlessJsTaskService;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;
import android.content.pm.PackageManager;
import android.util.Log;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import com.mbehaviorapp.services.ForegroundAppService;
import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.mbehaviorapp.services.LocationService;
import java.lang.Thread;
import android.support.v4.content.ContextCompat;
import android.support.v13.app.ActivityCompat;
import android.net.Uri;

public class MainActivity extends ReactActivity {

    private final int REQUEST_PERMISSION_FINE_LOCATIONS = 1;

    @Override
    protected String getMainComponentName() {
        return "mbehaviorapp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    LocationListener listener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {

            if (ContextCompat.checkSelfPermission(getApplicationContext(),
                    android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                Intent myIntent = new Intent(getApplicationContext(), LocationService.class);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    getApplicationContext().startForegroundService(myIntent);
                } else {
                    getApplicationContext().startService(myIntent);
                }
                HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
            }
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            Log.d("ReactNative", "change");
        }

        @Override
        public void onProviderEnabled(String provider) {
            Log.d("ReactNative", "enable");
        }

        @Override
        public void onProviderDisabled(String provider) {
            Log.d("ReactNative", "disabled");
        }
    };

    @Override
    protected void onStart() {
        super.onStart();

        startLauchAppService();
        requestUsageStats();
        requestFineLocations();
    }

    public void startLauchAppService() {
        Intent LaunchAppServiceIntent = new Intent(getApplicationContext(), LaunchAppService.class);
        getApplicationContext().startService(LaunchAppServiceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
    }

    public void requestUsageStats() {
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

    public void requestFineLocations() {
        if (ContextCompat.checkSelfPermission(getApplicationContext(),
                android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            // Start requesting for location
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);

            Intent LocationServiceIntent = new Intent(getApplicationContext(), LocationService.class);
            getApplicationContext().startService(LocationServiceIntent);
            HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
        } else {
            boolean showRationale = ActivityCompat.shouldShowRequestPermissionRationale(MainActivity.this, android.Manifest.permission.ACCESS_FINE_LOCATION);
            if (showRationale) {
                AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
                alertDialog.setTitle("Olá");
                alertDialog.setMessage("Para usar nosso app é necessário que você nos de acesso à sua localização");
                alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        ActivityCompat.requestPermissions(MainActivity.this,
                        new String[] { android.Manifest.permission.ACCESS_FINE_LOCATION },
                        REQUEST_PERMISSION_FINE_LOCATIONS);
                    }
                });
                alertDialog.show();
            } else {
                AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
                alertDialog.setTitle("Ops");
                alertDialog.setMessage("Infelizmete para usar nossos serviços, precisamos que você nos de acesso à sua localização.\nPor favor, clique em permissões e ative a localização.");
                alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Intent i = new Intent();
                        i.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                        i.addCategory(Intent.CATEGORY_DEFAULT);
                        i.setData(Uri.parse("package:" + getPackageName()));
                        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(i);
                    }
                });
                alertDialog.show();
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case REQUEST_PERMISSION_FINE_LOCATIONS: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
                    // Start requesting for location
                    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 2000, 1, listener);
                } else {
                    requestFineLocations();
                }
                return;
            }
        }
    }
}
