package com.research_usage_statistics.services;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationCompat;
import com.research_usage_statistics.MainActivity;

import com.research_usage_statistics.R;

import static com.research_usage_statistics.MainApplication.ForegroundAppChannel;

public class ForegroundAppService extends Service {

  @Override
  public void onCreate() {
    super.onCreate();
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {

    String input = intent.getStringExtra("inputExtra");

    Intent notificationIntent = new Intent(this, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

    Notification ForegroundAppNotification = new NotificationCompat.Builder(this, ForegroundAppChannel)
        .setContentTitle("Serviço de uso").setContentText(input).setSmallIcon(R.mipmap.ic_launcher)
        .setContentIntent(pendingIntent).build();

    startForeground(1, ForegroundAppNotification);

    // do heavy work on a background thread
    // stopSelf();

    return START_NOT_STICKY;
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
  }

  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }
}
