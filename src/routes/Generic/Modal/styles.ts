import { Text } from '@components/atoms/Text';
import { Button } from '@components/molecules/Button';
import { css } from 'styled-components';
import styled from 'styled-components/native';

interface IContainerProps {
  isFullscreen: boolean;
}

interface IContentProps {
  isFullscreen: boolean;
}

export const Container = styled.View<IContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ isFullscreen }) =>
    isFullscreen ? `background-color: #FFFFFF;` : `justify-content: flex-end;`}
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.View<IContentProps>`
  background-color: #ffffff;
  ${({ isFullscreen }) =>
    isFullscreen
      ? `
        flex: 1;
        padding: 24px;
        justify-content: center;
        align-items: center;
      `
      : `
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        padding: 24px;
        padding-top: 0;
        max-height: 80%;
      `}
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

export const IconContainer = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary.lightest};
    width: 96px;
    height: 96px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-top: 24px;
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    text-align: center;
    padding-top: 24px;
  `}
`;

export const Subtitle = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral600,
}))`
  ${({ theme }) => css`
    text-align: center;
    padding: ${theme.spacing.xs}px 0;
  `}
`;

export const OptionButton = styled(Button)`
  ${({ theme }) => css`
    margin-top: 16px;
  `}
`;
