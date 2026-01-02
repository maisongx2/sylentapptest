import React from 'react';
import * as S from './styles';
import { Logo } from '@components/atoms/Logo';
import { ELogoColor } from '@components/atoms/Logo/types';
import { useWelcome } from './useWelcome';

export const Welcome = () => {
  useWelcome();
  
  return (
    <S.Container>
      <S.GifBackground
        source={require('./images/water.gif')}
        resizeMode="cover"
      />

      <S.LogoWrapper>
        <Logo colorType={ELogoColor.BLUE}/>
      </S.LogoWrapper>
    </S.Container>
  );
};
