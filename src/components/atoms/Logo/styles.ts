import styled, { DefaultTheme } from 'styled-components/native';
import { IconSvg } from '../IconSvg';
import { ELogoColor, LogoProps } from './types';

export const Wordmark = styled.Text`
  color: #1c3e87;
  font-size: 38px;
  font-weight: 800;
  font-style: italic;
  transform: skewX(-10deg);
  letter-spacing: 0.5px;
  text-align: center;
`;

export const Container = styled.View`
  background-color: white;
  border: 1px solid black;
  padding: 5px 30px;
  border-radius: 60%;
`;

const logoModifier: Record<ELogoColor, (theme: DefaultTheme) => string> = {
  [ELogoColor.WHITE]: theme => theme.colors.background.global,
  [ELogoColor.BLUE]: theme => theme.colors.secondary.dark,
};

export const LogoSvg = styled(IconSvg).attrs<LogoProps>(
  ({ theme, colorType = ELogoColor.BLUE }) => ({
    color: logoModifier[colorType](theme),
  }),
)``;
