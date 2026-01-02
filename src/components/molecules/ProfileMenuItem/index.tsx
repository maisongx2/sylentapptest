import React from 'react';
import * as S from './styles';
import { ProfileMenuItemProps } from './types';
import { useSelector } from 'react-redux';
import { authSelectors } from '@store/modules/auth/authSelectors';

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon: Icon,
  label,
  onPress,
  variant = 'default',
}) => {

  const isLoading = useSelector(authSelectors.getLoading);
  const IconStyled = S.IconOption(Icon);
  return (
    <S.Container disabled={isLoading} onPress={onPress}>
      <IconStyled variant={variant} />

      <S.Label variant={variant}>{label}</S.Label>

      <S.ChevronIcon variant={variant} />
    </S.Container>
  );
};
