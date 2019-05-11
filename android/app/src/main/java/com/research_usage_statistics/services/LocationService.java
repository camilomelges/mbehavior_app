package com.research_usage_statistics.services;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import java.util.List;
import javax.annotation.Nullable;
import com.facebook.react.ReactApplication;
import android.app.ActivityManager;
import android.content.Context;
import android.app.Notification;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

//creating the service class
public class LocationService extends HeadlessJsTaskService {

  public static final String LocationServiceChannel = "LocationServiceService";

  private void createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel serviceChannel = new NotificationChannel(LocationServiceChannel, "LocationServiceChannel",
          NotificationManager.IMPORTANCE_HIGH);

      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(serviceChannel);
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();

    createNotificationChannel();

    Notification LocationServiceNotification = new NotificationCompat.Builder(this, LocationServiceChannel).build();

    startForeground(2, LocationServiceNotification);
  }

  @Nullable
  protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {

    Bundle extras = intent.getExtras();
    return new HeadlessJsTaskConfig("LogLocation", // JS function to call
        extras != null ? Arguments.fromBundle(extras) : null, 1000, true);
  }
}