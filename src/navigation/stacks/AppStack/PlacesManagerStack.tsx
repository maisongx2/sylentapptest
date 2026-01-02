import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute, PlacesManagerStackParamList } from '@navigation/index';
import { HouseList } from '@routes/Dashboard/PlaceManagerTab/modules/HouseList';
import { HouseManagement } from '@routes/Dashboard/PlaceManagerTab/modules/HouseManagement';
import { HouseDetails } from '@routes/Dashboard/PlaceManagerTab/modules/HouseDetails';
import { AddRoom } from '@routes/Dashboard/PlaceManagerTab/modules/AddRoom';

const Stack = createStackNavigator<PlacesManagerStackParamList>();

export const PlacesManagerStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    initialRouteName={AppRoute.HouseDetails}
  >
    <Stack.Screen name={AppRoute.HouseList} component={HouseList} />
    <Stack.Screen name={AppRoute.HouseDetails} component={HouseDetails} />
    <Stack.Screen name={AppRoute.AddRoom} component={AddRoom} />
  </Stack.Navigator>
);
