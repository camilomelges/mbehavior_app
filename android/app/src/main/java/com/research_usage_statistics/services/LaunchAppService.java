package com.mbehaviorapp.services;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;
import android.app.Notification;
import android.support.v4.app.NotificationCompat;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import com.rvalerio.fgchecker.AppChecker;
import android.util.Log;

import android.app.usage.UsageEvents;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import java.util.List;
import com.facebook.react.bridge.WritableArray;

public class LaunchAppService extends HeadlessJsTaskService {

  public static String LauchAppServiceChannel = "LaunchAppService";
  private static volatile boolean receiversRegistered = false;

  private String lastAppPackageName = "";

  public static UsageStats lastApp;
  public static UsageStats actualApp;

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel serviceChannel = new NotificationChannel(LauchAppServiceChannel, "LauchAppServiceChannel",
          NotificationManager.IMPORTANCE_HIGH);

      serviceChannel.setSound(null, null);
      serviceChannel.setShowBadge(false);

      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(serviceChannel);
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    if (receiversRegistered)
      return;
    receiversRegistered = true;

    getActualPackageName();

    createNotificationChannel();
    Notification LauchAppNotification = new NotificationCompat.Builder(this, LauchAppServiceChannel).build();
    startForeground(3, LauchAppNotification);
  }

  private void setLastAppPackageName(String lastPackageName) {
    lastAppPackageName = lastPackageName;
  }

  public void getActualPackageName() {
    AppChecker appChecker = new AppChecker();
    appChecker.whenAny(new AppChecker.Listener() {
      @Override
      public void onForeground(String actualPackageName) {
        Log.d("ReactNative", "getActualPackageName fora do if");

        if (actualPackageName != null && !actualPackageName.equals(lastAppPackageName)) {
          Log.d("ReactNative", "getActualPackageName dentro do if");
          
          Log.d("ReactNative", lastAppPackageName+actualPackageName);

          setActualAndLastAppStats(actualPackageName);
        }
      }
    }).timeout(5000).start(getApplicationContext());
  }

  private void setActualAndLastAppStats(String actualPackageName) {
    long yesterday = System.currentTimeMillis() - 2 * 24 * 60 * 60 * 1000;
    PackageManager pm = getApplicationContext().getPackageManager();
    List<PackageInfo> pList = pm.getInstalledPackages(0);
    UsageStatsManager manager = (UsageStatsManager) getApplicationContext()
        .getSystemService(getApplicationContext().USAGE_STATS_SERVICE);
    List<UsageStats> stats = manager.queryUsageStats(manager.INTERVAL_DAILY, yesterday, System.currentTimeMillis());

    WritableArray list = Arguments.createArray();
    for (int i = 0; i < stats.size(); i++) {

      UsageStats stat = stats.get(i);
        if (stat.getPackageName().equals(actualPackageName) || stat.getPackageName().equals(lastAppPackageName)) {
          if (stat.getPackageName().equals(lastAppPackageName))
            lastApp = stat;
          else
            actualApp = stat;
        }
    }

    if (!lastAppPackageName.equals("") && lastAppPackageName != null) {
      Log.d("ReactNative", "AQUI");
      Intent LaunchAppServiceIntent = new Intent(getApplicationContext(), LaunchAppService.class);
      getApplicationContext().startService(LaunchAppServiceIntent);
      HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
    }

    setLastAppPackageName(actualPackageName);
  }

  @Nullable
  protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {

    Bundle extras = intent.getExtras();
    return new HeadlessJsTaskConfig("LauchApp", extras != null ? Arguments.fromBundle(extras) : null, 1000, true);
  }
}