package com.mbehaviorapp.packages;

import android.widget.Toast;

import com.mbehaviorapp.services.LaunchAppService;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.util.Base64;
import java.io.ByteArrayOutputStream;
import org.json.JSONObject;
import org.json.JSONException;

import android.app.usage.UsageEvents;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

import java.text.SimpleDateFormat;
import java.util.concurrent.TimeUnit;

import android.util.Log;
import java.util.Map;
import java.util.HashMap;
import java.util.Calendar;
import java.util.List;
import java.util.ArrayList;
import java.time.Instant;

public class UsageStatsModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
  private final ReactApplicationContext reactContext;

  public UsageStatsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "UsageStats";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    // TODO: Add any necessary constants to the module here
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("M-d-yyyy HH:mm:ss");
  public static final String TAG = UsageStatsModule.class.getSimpleName();

  @ReactMethod
  public void getAppsToday(Promise promise) {
    try {
      Calendar calendar = Calendar.getInstance();
      long endTime = System.currentTimeMillis();
      calendar.add(Calendar.YEAR, -5);
      long startTime = calendar.getTimeInMillis();

      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      UsageStatsManager manager = (UsageStatsManager) this.reactContext
          .getSystemService(this.reactContext.USAGE_STATS_SERVICE);
      List<UsageStats> stats = manager.queryUsageStats(manager.INTERVAL_DAILY, 1420113600, System.currentTimeMillis());

      WritableArray apps = Arguments.createArray();
      for (int i = 0; i < stats.size(); i++) {
        UsageStats stat = stats.get(i);
        WritableMap app = Arguments.createMap();

        Bitmap bitmap;
        if (pm.getApplicationIcon(stat.getPackageName()) instanceof BitmapDrawable) {
          bitmap = ((BitmapDrawable) pm.getApplicationIcon(stat.getPackageName())).getBitmap();
        } else {
          bitmap = getBitmapFromDrawable(pm.getApplicationIcon(stat.getPackageName()));
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);

        String stringIcon = Base64.encodeToString(outputStream.toByteArray(), Base64.DEFAULT);

        // app.putString("packageIcon", stringIcon);
        app.putString("packageIcon", "stringIcon");

        ApplicationInfo appInfo = pm.getApplicationInfo(stat.getPackageName(), 0);

        // long now = Instant.now().toEpochMilli();
        app.putString("packageName", pm.getApplicationLabel(appInfo).toString());
        app.putDouble("totalActivedTime", stat.getFirstTimeStamp());
        app.putDouble("initTimeInInterval", stat.getFirstTimeStamp());
        app.putDouble("lastTimeInInterval", stat.getLastTimeStamp());
        app.putDouble("lastUsageTime", stat.getLastTimeUsed());
        app.putDouble("usageTime", stat.getTotalTimeInForeground());
        app.putDouble("usageInThisSession", 0);
        app.putBoolean("last", true);

        apps.pushMap(app);
      }
      promise.resolve(apps);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  @ReactMethod
  public void getActualApp(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      LaunchAppService launchAppService = new LaunchAppService();

      UsageStats lastApp = launchAppService.lastApp;
      UsageStats actualApp = launchAppService.actualApp;

      WritableNativeMap app = new WritableNativeMap();

      Log.d("ReactNative", launchAppService.LauchAppServiceChannel);
      ApplicationInfo appInfo = pm.getApplicationInfo(launchAppService.lastApp.getPackageName(), 0);

      app.putString("packageName", pm.getApplicationLabel(appInfo).toString());
      app.putDouble("totalActivedTime", lastApp.getFirstTimeStamp());
      app.putDouble("initTimeInInterval", lastApp.getFirstTimeStamp());
      app.putDouble("lastTimeUsed", lastApp.getLastTimeUsed());
      app.putDouble("usageTime", lastApp.getTotalTimeInForeground()/1000);

      promise.resolve(app);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  private Bitmap getBitmapFromDrawable(Drawable drawable) {
    final Bitmap bmp = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(),
        Bitmap.Config.ARGB_8888);
    final Canvas canvas = new Canvas(bmp);
    drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
    drawable.draw(canvas);
    return bmp;
  }

  @ReactMethod
  public void getAppsForPeriod(Promise promise) {
    try {
      long yesterday = System.currentTimeMillis() - 2 * 24 * 60 * 60 * 1000;
      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      UsageStatsManager manager = (UsageStatsManager) this.reactContext
          .getSystemService(this.reactContext.USAGE_STATS_SERVICE);
      List<UsageStats> stats = manager.queryUsageStats(manager.INTERVAL_DAILY, yesterday, System.currentTimeMillis());

      WritableArray list = Arguments.createArray();
      for (int i = 0; i < stats.size(); i++) {
        UsageStats stat = stats.get(i);
        WritableMap appInfo = Arguments.createMap();

        appInfo.putString("packageName", stat.getPackageName());
        appInfo.putDouble("totalActivedTime", stat.getFirstTimeStamp());
        appInfo.putDouble("initTimeInInterval", stat.getFirstTimeStamp());
        appInfo.putDouble("lastTimeInInterval", stat.getLastTimeStamp());
        appInfo.putDouble("lastUsageTime", stat.getLastTimeUsed());
        appInfo.putDouble("usageInThisSession", 0);
        appInfo.putDouble("usageTime", stat.getTotalTimeInForeground());
        appInfo.putBoolean("last", true);

        list.pushMap(appInfo);
      }
      promise.resolve(list);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  public static List<UsageStats> getUsageStatsList(Context context) {
    UsageStatsManager usm = getUsageStatsManager(context);
    Calendar calendar = Calendar.getInstance();
    long endTime = calendar.getTimeInMillis();
    calendar.add(Calendar.YEAR, -1);
    long startTime = calendar.getTimeInMillis();
    Log.d(TAG, "Range start:" + dateFormat.format(startTime));
    Log.d(TAG, "Range end:" + dateFormat.format(endTime));
    List<UsageStats> usageStatsList = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);
    return usageStatsList;
  }

  public static void printCurrentUsageStatus(Context context) {
    printUsageStats(getUsageStatsList(context));
  }

  @SuppressWarnings("ResourceType")
  private static UsageStatsManager getUsageStatsManager(Context context) {
    UsageStatsManager usm = (UsageStatsManager) context.getSystemService("usagestats");
    return usm;
  }

  public static void printUsageStats(List<UsageStats> usageStatsList) {
    for (UsageStats u : usageStatsList) {
      Log.d(TAG, "Pkg: " + u.getPackageName() + "\t" + "ForegroundTime: " + u.getTotalTimeInForeground());
    }
  }
}
