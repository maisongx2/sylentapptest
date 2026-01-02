package com.syllent.connectdev

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.syllent.connectdev.tuya.TuyaAndroidPackage
import com.thingclips.smart.home.sdk.ThingHomeSdk

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
            context = applicationContext,
            packageList = PackageList(this).packages.apply { add(TuyaAndroidPackage()) },
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)

    try {
      Log.d("TuyaInit", "🔥 Initializing Tuya SDK...")

      // O SDK vai ler App Key e Secret do AndroidManifest.xml
      ThingHomeSdk.init(this)

      Log.d("TuyaInit", "✅ Tuya SDK initialized successfully")

      // Enable debug mode
      ThingHomeSdk.setDebugMode(true)
      Log.d("TuyaInit", "✅ Debug mode enabled")
    } catch (e: Exception) {
      Log.e("TuyaInit", "❌ Error initializing Tuya SDK", e)
    }
  }
}
