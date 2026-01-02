import React from 'react';
import * as S from './styles';
import { useProfile } from './useProfile';
import { NavigationHeader } from '@components/molecules/NavigationHeader';
import { ProfileMenuItem } from '@components/molecules/ProfileMenuItem';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { authSelectors } from '@store/modules/auth/authSelectors';

export const ProfileScreen = () => {
  const { user, menuItems, handleGoBack } = useProfile(); 
  const loading = useSelector(authSelectors.getLoading);

  return (
    <S.Container>
      <NavigationHeader headerText="MINHA CONTA" goBack={handleGoBack} />

      <S.Content>
        <S.UserSection>
          <S.Avatar source={{ uri: user?.avatarUrl }} />
          <S.UserInfo>
            <S.UserName>{user?.firstName}</S.UserName>
            <S.UserEmail>{user?.email}</S.UserEmail>
          </S.UserInfo>
        </S.UserSection>

        { loading && (
            <ActivityIndicator size="large" color="#0EA5E9" />
          )
        }
        <S.MenuList>
          {menuItems.map(item => (
            <ProfileMenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              onPress={item.onPress}
              variant={item.variant}
            />
          ))}
        </S.MenuList>
      </S.Content>
    </S.Container>
  );
};
