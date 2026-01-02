import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconSvg } from '@components/atoms/IconSvg';
import { Icon } from '@assets/icons';
import { AppRoute } from '@navigation/config/routes';
import { PlacesManagerStack } from './PlacesManagerStack';
import { HomeTab } from '@routes/Dashboard/HomeTab';
import { ProfileScreen } from '@routes/Dashboard/Profile';

const Tab = createBottomTabNavigator();

export const ActiveIconWrapper = styled.View<{ focused: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
`;

const renderTabIcon =
  (iconRef: Icon) =>
  ({ size, color }: { focused: boolean; color: string; size: number }) =>
    <IconSvg icon={iconRef} width={size} height={size} color={color} />;

const renderPoolTabIcon =
  (iconRef: Icon) =>
  ({
    focused,
    size,
    color,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) =>
    (
      <ActiveIconWrapper focused={focused}>
        <IconSvg icon={iconRef} width={size} height={size} color={color} />
      </ActiveIconWrapper>
    );

export const AppTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.secondary.dark,
        tabBarInactiveTintColor: theme.colors.neutrals.neutral900,
        tabBarStyle: {
          backgroundColor: theme.colors.background.global,
          borderTopWidth: 1,
          borderTopColor: theme.colors.neutrals.neutral300,
          paddingTop: 16,
        },
      }}
    >
      <Tab.Screen
        name={AppRoute.HomeTab}
        component={HomeTab}
        options={{
          tabBarIcon: renderTabIcon(Icon.home),
        }}
      />

      <Tab.Screen
        name={AppRoute.PlacesManagerTabStack}
        component={PlacesManagerStack}
        options={{
          tabBarIcon: renderTabIcon(Icon.door),
        }}
      />

      <Tab.Screen
        name="PoolTab"
        component={HomeTab}
        options={{
          tabBarIcon: renderPoolTabIcon(Icon.waves),
        }}
      />

      <Tab.Screen
        name="AutomationTab"
        component={HomeTab}
        options={{
          tabBarIcon: renderTabIcon(Icon.electricity),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: renderTabIcon(Icon.user),
        }}
      />
    </Tab.Navigator>
  );
};
