package com.research_usage_statistics;

import com.research_usage_statistics.packages.*;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;

import android.content.pm.PackageManager;
import android.support.v4.content.ContextCompat;
import android.support.v13.app.ActivityCompat;

import java.util.Arrays;
import java.util.List;
import android.util.Log;

import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.research_usage_statistics.services.LocationService;
import com.research_usage_statistics.services.LaunchAppService;
import android.content.Context;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;
import org.json.JSONObject;
import org.json.JSONException;
import com.rvalerio.fgchecker.AppChecker;
import android.app.ActivityManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.app.ActivityManager;
import android.support.v4.content.ContextCompat;
import com.research_usage_statistics.services.ForegroundAppService;

public class MainApplication extends Application implements ReactApplication {

  public static final String ForegroundAppChannel = "ForegroundAppService";

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel serviceChannel = new NotificationChannel(ForegroundAppChannel, "ForegroundAppChannel",
          NotificationManager.IMPORTANCE_HIGH);

      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(serviceChannel);

      startService();
    }
  }

  public void startService() {
    Intent serviceIntent = new Intent(this, ForegroundAppService.class);
    ContextCompat.startForegroundService(this, serviceIntent);
  }

  public void stopService() {
    Intent serviceIntent = new Intent(this, ForegroundAppService.class);
    stopService(serviceIntent);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new SQLitePluginPackage(), new MainReactPackage(),
          new RNBackgroundFetchPackage(), new RNGestureHandlerPackage(), new RNDeviceInfo(), new VectorIconsPackage(),
          new ModulesPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    createNotificationChannel();

    sendBroadcast(new Intent("YouWillNeverKillMe"));

    SoLoader.init(this, /* native exopackage */ false);
  }
}