import { theme } from '@assets/globalTheme/themes';
import { Animated } from 'react-native';
import styled, { css } from 'styled-components';

export type spinnerContainerProps = {
  width?: number;
  height?: number;
};

export const SpinnerContainer = styled(Animated.View)<spinnerContainerProps>`
  ${({ theme, width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;
