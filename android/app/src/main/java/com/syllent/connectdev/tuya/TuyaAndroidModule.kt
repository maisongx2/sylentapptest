package com.syllent.connectdev.tuya

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.thingclips.smart.android.user.api.ILoginCallback
import com.thingclips.smart.android.user.api.ILogoutCallback
import com.thingclips.smart.android.user.api.IRegisterCallback
import com.thingclips.smart.android.user.bean.User
import com.thingclips.smart.home.sdk.ThingHomeSdk
import com.thingclips.smart.home.sdk.bean.HomeBean
import com.thingclips.smart.home.sdk.bean.RoomBean
import com.thingclips.smart.home.sdk.callback.IThingGetHomeListCallback
import com.thingclips.smart.home.sdk.callback.IThingGetRoomListCallback
import com.thingclips.smart.home.sdk.callback.IThingHomeResultCallback
import com.thingclips.smart.sdk.api.IResultCallback

class TuyaAndroidModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "TuyaModule"

    @ReactMethod
    fun sendVerifyCode(email: String, region: String, countryCode: String, promise: Promise) {
        val type = 1 // email verification code

        Log.d(TAG, "📧 sendVerifyCode → email=$email region=$region countryCode=$countryCode")

        try {
            ThingHomeSdk.getUserInstance()
                    .sendVerifyCodeWithUserName(
                            email,
                            region,
                            countryCode,
                            type,
                            object : IResultCallback {
                                override fun onSuccess() {
                                    Log.d(TAG, "✅ Verification code sent successfully to $email")
                                    promise.resolve(
                                            Arguments.createMap().apply {
                                                putBoolean("success", true)
                                                putString("message", "Code sent to $email")
                                            }
                                    )
                                }

                                override fun onError(code: String, error: String) {
                                    Log.e(TAG, "❌ Failed to send verify code – $code | $error")
                                    promise.reject(code, error)
                                }
                            }
                    )
        } catch (e: Exception) {
            Log.e(TAG, "Exception sending verify code", e)
            promise.reject("SEND_CODE_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun registerByEmail(
            countryCode: String,
            email: String,
            password: String,
            code: String,
            promise: Promise
    ) {
        Log.d(TAG, "📝 registerByEmail → countryCode=$countryCode email=$email")

        try {
            ThingHomeSdk.getUserInstance()
                    .registerAccountWithEmail(
                            countryCode,
                            email,
                            password,
                            code,
                            object : IRegisterCallback {
                                override fun onSuccess(user: User) {
                                    Log.d(TAG, "✅ Register successful! User UID: ${user.uid}")
                                    promise.resolve(
                                            Arguments.createMap().apply {
                                                putBoolean("success", true)
                                                putString("uid", user.uid ?: "")
                                                putString("email", user.email ?: email)
                                                putString("username", user.username ?: "")
                                            }
                                    )
                                }

                                override fun onError(code: String, error: String) {
                                    Log.e(TAG, "❌ Register failed – $code | $error")
                                    promise.reject(code, error)
                                }
                            }
                    )
        } catch (e: Exception) {
            Log.e(TAG, "Exception registering", e)
            promise.reject("REGISTER_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun login(countryCode: String, email: String, password: String, promise: Promise) {
        Log.d(TAG, "🔐 login → countryCode=$countryCode email=$email")

        try {
            ThingHomeSdk.getUserInstance()
                    .loginWithEmail(
                            countryCode,
                            email,
                            password,
                            object : ILoginCallback {
                                override fun onSuccess(user: User) {
                                    Log.d(TAG, "✅ Login successful! UID: ${user.uid}")

                                    // ✅ CORRIGIDO: Removido nickname
                                    promise.resolve(
                                            Arguments.createMap().apply {
                                                putBoolean("success", true)
                                                putString("uid", user.uid ?: "")
                                                putString("email", user.email ?: email)
                                                putString("username", user.username ?: "")
                                                // Campos adicionais disponíveis no User:
                                                putString("phoneCode", user.phoneCode ?: "")
                                                putString("mobile", user.mobile ?: "")
                                            }
                                    )
                                }

                                override fun onError(code: String, error: String) {
                                    Log.e(TAG, "❌ Login failed – $code | $error")
                                    promise.reject(code, error)
                                }
                            }
                    )
        } catch (e: Exception) {
            Log.e(TAG, "Exception logging in", e)
            promise.reject("LOGIN_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun createHome(
            name: String,
            geoName: String,
            rooms: ReadableArray,
            lat: Double,
            lng: Double,
            promise: Promise
    ) {
        val roomList = mutableListOf<String>()
        for (i in 0 until rooms.size()) {
            rooms.getString(i)?.let { roomList.add(it) }
        }

        Log.d(TAG, "🏠 createHome → name=$name geo=$geoName rooms=$roomList")

        try {
            ThingHomeSdk.getHomeManagerInstance()
                    .createHome(
                            name,
                            lat,
                            lng,
                            geoName,
                            roomList,
                            object : IThingHomeResultCallback {
                                override fun onSuccess(home: HomeBean) {
                                    Log.d(TAG, "✅ Home created! ID: ${home.homeId}")
                                    promise.resolve(
                                            Arguments.createMap().apply {
                                                putBoolean("success", true)
                                                putDouble("homeId", home.homeId.toDouble())
                                                putString("name", home.name)
                                                putString("geoName", home.geoName ?: "")
                                            }
                                    )
                                }

                                override fun onError(code: String, error: String) {
                                    Log.e(TAG, "❌ Failed to create home – $code | $error")
                                    promise.reject(code, error)
                                }
                            }
                    )
        } catch (e: Exception) {
            Log.e(TAG, "Exception creating home", e)
            promise.reject("CREATE_HOME_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun logout(promise: Promise) {
        Log.d(TAG, "👋 logout")

        try {
            ThingHomeSdk.getUserInstance()
                    .logout(
                            object : ILogoutCallback {
                                override fun onSuccess() {
                                    Log.d(TAG, "✅ User logged out")
                                    promise.resolve(
                                            Arguments.createMap().apply {
                                                putBoolean("success", true)
                                            }
                                    )
                                }

                                override fun onError(code: String, error: String) {
                                    Log.e(TAG, "❌ Logout failed – $code | $error")
                                    promise.reject(code, error)
                                }
                            }
                    )
        } catch (e: Exception) {
            Log.e(TAG, "Exception logging out", e)
            promise.reject("LOGOUT_ERROR", e.message, e)
        }
    }

    /** ✅ Get Home List with Rooms */
    @ReactMethod
    fun getHomeList(promise: Promise) {
        Log.d(TAG, "🏘️ getHomeList")

        try {
            ThingHomeSdk.getHomeManagerInstance()
                    .queryHomeList(
                            object : IThingGetHomeListCallback {

                                override fun onSuccess(homeList: List<HomeBean>) {
                                    val resultArray = Arguments.createArray()
                                    var pendingHomes = homeList.size

                                    if (homeList.isEmpty()) {
                                        Log.d(TAG, "ℹ️ No homes found")
                                        promise.resolve(resultArray)
                                        return
                                    }

                                    Log.d(TAG, "✅ Found ${homeList.size} homes")

                                    homeList.forEach { home ->
                                        val homeMap = Arguments.createMap()
                                        homeMap.putDouble("homeId", home.homeId.toDouble())
                                        homeMap.putString("name", home.name)
                                        homeMap.putString("geoName", home.geoName ?: "")

                                        val homeInstance = ThingHomeSdk.newHomeInstance(home.homeId)

                                        homeInstance.queryRoomList(
                                                object : IThingGetRoomListCallback {

                                                    override fun onSuccess(
                                                            roomList: List<RoomBean>
                                                    ) {
                                                        val roomsArray = Arguments.createArray()

                                                        roomList.forEach { room ->
                                                            val roomMap = Arguments.createMap()
                                                            roomMap.putDouble(
                                                                    "roomId",
                                                                    room.roomId.toDouble()
                                                            )
                                                            roomMap.putString("name", room.name)
                                                            roomsArray.pushMap(roomMap)
                                                        }

                                                        homeMap.putArray("rooms", roomsArray)
                                                        resultArray.pushMap(homeMap)

                                                        pendingHomes--
                                                        if (pendingHomes == 0) {
                                                            promise.resolve(resultArray)
                                                        }
                                                    }

                                                    override fun onError(
                                                            code: String,
                                                            error: String
                                                    ) {
                                                        Log.e(
                                                                TAG,
                                                                "❌ Failed to get rooms for home ${home.homeId}: $code | $error"
                                                        )

                                                        homeMap.putArray(
                                                                "rooms",
                                                                Arguments.createArray()
                                                        )
                                                        resultArray.pushMap(homeMap)

                                                        pendingHomes--
                                                        if (pendingHomes == 0) {
                                                            promise.resolve(resultArray)
                                                        }
                                                    }
                                                }
                                        )
                                    }
                                }

                                override fun onError(code: String, error: String) {
                                    Log.e(TAG, "❌ Failed to get home list – $code | $error")
                                    promise.reject(code, error)
                                }
                            }
                    )
        } catch (e: Exception) {
            Log.e(TAG, "Exception getting home list", e)
            promise.reject("GET_HOME_LIST_ERROR", e.message, e)
        }
    }

    companion object {
        private const val TAG = "TuyaAndroidModule"
    }
}
