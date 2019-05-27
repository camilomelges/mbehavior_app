package com.mbehaviorapp;

import com.mbehaviorapp.packages.*;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.horcrux.svg.SvgPackage;
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
import java.util.Arrays;
import android.os.Bundle;
import java.util.List;
import android.util.Log;
import android.content.Context;
import android.content.Intent;
import com.rvalerio.fgchecker.AppChecker;
import android.app.NotificationChannel;
import android.app.Notification;
import android.app.NotificationManager;
import android.support.v4.app.NotificationCompat;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import com.mbehaviorapp.services.ForegroundAppService;
import android.location.LocationManager;
import android.location.LocationListener;
import android.location.Location;
import com.mbehaviorapp.services.LocationService;

public class MainApplication extends Application implements ReactApplication {

  public static final String ForegroundAppChannel = "ForegroundAppService";

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel serviceChannel = new NotificationChannel(ForegroundAppChannel, "ForegroundAppChannel",
          NotificationManager.IMPORTANCE_HIGH);

          serviceChannel.setSound(null, null);
          serviceChannel.setShowBadge(false);

      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(serviceChannel);

      startService();
    } else {
      Notification LocationServiceNotification = new NotificationCompat.Builder(this, ForegroundAppChannel).build();
      startService();
      NotificationManager manager = getSystemService(NotificationManager.class);
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
            new BlurViewPackage(),
            new SvgPackage(),
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