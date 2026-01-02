import React from 'react';
import * as S from './styles';
import { IconButtonProps, EIconButtonType } from './types';
import { IconSvg } from '@components/atoms/IconSvg';

export const IconButton = ({
  icon,
  label,
  type = EIconButtonType.PRIMARY,
  full = true,
  disabled,
  onPress,
  iconWidth,
  iconHeight,
  iconColor,
  iconStrokeColor,
  ...rest
}: IconButtonProps) => {
  return (
    <S.Container
      onPress={onPress}
      disabled={disabled}
      full={full}
      type={type}
      activeOpacity={0.7}
      {...rest}
    >
      {icon && (
        <IconSvg
          icon={icon}
          color={iconColor}
          width={iconWidth}
          height={iconHeight}
          strokeColor={iconStrokeColor}
        />
      )}

      {label && (
        <S.Label type={type} variant="bodyMediumRegular">
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};
