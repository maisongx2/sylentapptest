import React from 'react';

import * as S from './styles';
import { useSpinner } from './useSpinner';
import { Icon } from '../../../assets/icons';
import { IconSvg } from '../IconSvg';

export type SpinnerProps = {
  height: number;
  width: number;
  color?: string;
  strokeColor?: string;
};

export const Spinner = ({
  height,
  width,
  color,
  strokeColor,
}: SpinnerProps) => {
  const { rotateInterpolation } = useSpinner();

  return (
    <S.SpinnerContainer
      style={{ transform: [{ rotate: rotateInterpolation }] }}
    >
      <IconSvg
        icon={Icon.spinner}
        height={height}
        width={width}
        color={color}
        strokeColor={strokeColor}
      />
    </S.SpinnerContainer>
  );
};
