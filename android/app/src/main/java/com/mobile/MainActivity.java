package io.dripr.mobile.android;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.react.ReactPackage;
import java.util.List;

public class MainActivity extends ReactActivity {
    CallbackManager mCallbackManager = 
    MainApplication.getCallbackManager();
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "dripr";
    }

    
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
}
