import React from 'react';
import * as S from './styles';
import { Logo } from '@components/atoms/Logo';
import { ELogoColor } from '@components/atoms/Logo/types';
import { useIsLoading } from './useLoading';

export const Loading = () => {
  // useIsLoading();

  return (
    <S.Container>
      <S.GifBackground
        source={require('./images/waves.gif')}
        resizeMode="cover"
      />
      <S.LogoWrapper>
        <Logo colorType={ELogoColor.WHITE} />
      </S.LogoWrapper>
    </S.Container>
  );
};
