import React from 'react';
import styled from 'styled-components/native';

import * as S from './styles';
import { theme } from '@assets/globalTheme/themes';
import { ETextVariant } from '../../../assets/globalTheme/themes/typography.ts';
import { DividerLine } from '../DividerLine/index.tsx';

type Props = {
  children: React.ReactNode;
  variant?: ETextVariant;
  color?: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  style?: any;
};

export const Text = ({
  children,
  variant = 'bodyExtraSmallRegular',
  color,
  numberOfLines,
  ellipsizeMode,
  style,
  ...rest
}: Props) => {
  return (
    <S.Container {...rest}>
      <S.StyledText
        variant={variant}
        color={color}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        style={style}
        {...rest}
      >
        {children}
      </S.StyledText>
    </S.Container>
  );
};
