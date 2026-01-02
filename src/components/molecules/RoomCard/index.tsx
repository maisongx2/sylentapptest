import React from 'react';
import * as S from './styles';
import { Text } from '@components/atoms/Text';
import { RoomCardProps } from './types';
import { useRoomCard } from './useRoomCard';
import { Icon } from '@components/atoms/Icon';
import { DropDownMenu } from '../DropDownMenu';

export const RoomCard: React.FC<RoomCardProps> = ({
  name,
  icon,
  devicesCount,
  onPress,
  dropDownMenuActions,
}) => {
  const {
    menuVisible,
    buttonLayout,
    handleMenuPress,
    handleCloseMenu,
    handleButtonLayout,
  } = useRoomCard();

  return (
    <S.Container onPress={onPress} selected={false}>
      {icon && (
        <S.IconContainer>
          <Icon {...icon} />
        </S.IconContainer>
      )}

      <S.InfoContainer>
        <Text variant="bodyMediumBold">{name}</Text>
        <Text variant="bodySmallRegular" color="neutral600">
          {devicesCount} {devicesCount === 1 ? 'dispositivo' : 'dispositivos'}
        </Text>
      </S.InfoContainer>

      {dropDownMenuActions && dropDownMenuActions.length > 0 && (
        <S.MenuButton onPress={handleMenuPress} onLayout={handleButtonLayout}>
          <S.MenuIcon />
        </S.MenuButton>
      )}

      {dropDownMenuActions && dropDownMenuActions.length > 0 && (
        <DropDownMenu
          visible={menuVisible}
          onClose={handleCloseMenu}
          actions={dropDownMenuActions}
          buttonPosition={buttonLayout}
        />
      )}
    </S.Container>
  );
};
