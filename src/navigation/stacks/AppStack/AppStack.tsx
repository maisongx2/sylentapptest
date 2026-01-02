import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList, AppRoute } from '@navigation/index';
import { AppTabs } from './AppTabs';
import { ErrorScreen } from '@routes/Generic/ErrorScreen';
import { Loading } from '@routes/Generic/Loading';
import { HouseManagement } from '@routes/Dashboard/PlaceManagerTab/modules/HouseManagement';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    initialRouteName={AppRoute.Home}
  >
    <Stack.Screen name={AppRoute.Home} component={AppTabs} />
    <Stack.Screen name={AppRoute.ErrorScreen} component={ErrorScreen} />
    <Stack.Screen name={AppRoute.LoadingScreen} component={Loading} />
    <Stack.Screen name={AppRoute.HouseManagement} component={HouseManagement} />
  </Stack.Navigator>
);
