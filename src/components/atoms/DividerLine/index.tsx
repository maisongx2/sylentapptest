import React from 'react';
import * as S from './styles';
import type { DividerLineProps } from './types';

export const DividerLine = ({ ...rest }: DividerLineProps) => {
  return <S.Container {...rest} />;
};
