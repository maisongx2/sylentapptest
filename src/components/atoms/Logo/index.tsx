import React from 'react';
import { Icon } from '@assets/icons';
import { IconSvg } from '@components/atoms/IconSvg';
import { ThemeColor } from '@assets/globalTheme/themes/themeTypes';
import { LogoProps } from './types';
import * as S from './styles';

export const Logo = ({ colorType }: LogoProps) => {
  return (
    <S.LogoSvg icon={Icon.logo} colorType={colorType} width={182} height={56} />
  );
};
