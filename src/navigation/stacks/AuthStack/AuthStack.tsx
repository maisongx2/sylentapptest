import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '@routes/Authentication/Welcome';
import { Login } from '@routes/Authentication/Login';
import { SignUp } from '@routes/Authentication/SiginUp';
import { AuthRoute, AuthStackParamList } from '@navigation/index';
import { ErrorScreen } from '@routes/Generic/ErrorScreen';
import { Loading } from '@routes/Generic/Loading';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    initialRouteName={AuthRoute.Welcome}
  >
    <Stack.Screen name={AuthRoute.Welcome} component={Welcome} />
    <Stack.Screen name={AuthRoute.Login} component={Login} />
    <Stack.Screen name={AuthRoute.SignUp} component={SignUp} />
    <Stack.Screen name={AuthRoute.ErrorScreen} component={ErrorScreen} />
    <Stack.Screen name={AuthRoute.LoadingScreen} component={Loading} />
  </Stack.Navigator>
);
