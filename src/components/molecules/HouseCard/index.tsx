import React from 'react';
import * as S from './styles';
import { Text } from '@components/atoms/Text';
import { DropDownMenu } from '../DropDownMenu';
import { HouseCardProps } from './types';
import { useHouseCard } from './useHouseCard';

export const HouseCard: React.FC<HouseCardProps> = ({
  name,
  devicesCount,
  dropDownMenuActions,
}) => {
  const {
    menuVisible,
    buttonLayout,
    handleMenuPress,
    handleCloseMenu,
    handleButtonLayout,
  } = useHouseCard();

  return (
    <S.ShadowWrapper>
      <S.Container>
        <S.Content>
          <S.IconContainer>
            <S.HouseIcon />
          </S.IconContainer>

          <S.InfoContainer>
            <Text variant="bodyMediumBold">{name}</Text>
            <Text variant="bodySmallRegular" color="neutral600">
              Dispositivos conectados: {devicesCount}
            </Text>
          </S.InfoContainer>

          {dropDownMenuActions.length > 0 && (
            <S.MenuButton
              onPress={handleMenuPress}
              onLayout={handleButtonLayout}
            >
              <S.MenuIcon />
            </S.MenuButton>
          )}
        </S.Content>

        {dropDownMenuActions.length > 0 && (
          <DropDownMenu
            visible={menuVisible}
            onClose={handleCloseMenu}
            actions={dropDownMenuActions}
            buttonPosition={buttonLayout}
          />
        )}
      </S.Container>
    </S.ShadowWrapper>
  );
};
