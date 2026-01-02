import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppStack } from './AppStack/AppStack';
import { navigationRef, RootStackParamList, Route } from '@navigation/index';
import { authSelectors } from '@store/modules/auth/authSelectors';
import { authActions } from '@store/modules/auth/authActions';
import { AuthStack } from './AuthStack/AuthStack';

const RootStack = createStackNavigator<RootStackParamList>();

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.global};
  padding: 0;
`;

export const RootStackNavigator = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  const loading = useSelector(authSelectors.getLoading);

  useEffect(() => {
    dispatch(authActions.restoreSessionRequest());
  }, [dispatch]);

  if (loading && !isLoggedIn) {
    // TODO: Criar uma tela de Splash/Loading bonita
    return null; // ou <SplashScreen />
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Container edges={['top']}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <RootStack.Screen name={Route.App} component={AppStack} />
          ) : (
            <RootStack.Screen name={Route.Auth} component={AuthStack} />
          )}
        </RootStack.Navigator>
      </Container>
    </NavigationContainer>
  );
};
