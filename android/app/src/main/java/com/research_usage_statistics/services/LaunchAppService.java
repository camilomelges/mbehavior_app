package com.research_usage_statistics.services;

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

public class LaunchAppService extends HeadlessJsTaskService {

    public static final String LauchAppServiceChannel = "LaunchAppService";

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(LauchAppServiceChannel,
                    "LauchAppServiceChannel", NotificationManager.IMPORTANCE_HIGH);

            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();

        AppChecker appChecker = new AppChecker();
        appChecker.whenAny(new AppChecker.Listener() {
            @Override
            public void onForeground(String packageName) {
                Log.d("ReactNative", packageName);
            }
        }).timeout(10000).start(getApplicationContext());

        createNotificationChannel();

        Notification LauchAppNotification = new NotificationCompat.Builder(this, LauchAppServiceChannel).build();

        startForeground(3, LauchAppNotification);
    }

    @Nullable
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {

        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig("LauchApp", extras != null ? Arguments.fromBundle(extras) : null, 1000, true);
    }
}