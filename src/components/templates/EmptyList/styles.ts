import { IconSvg } from '@components/atoms/IconSvg';
import { Text } from '@components/atoms/Text';
import { css } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
  align-items: center;
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

export const BigIcon = styled(IconSvg).attrs(({ theme }) => ({
  color: theme.colors.secondary.dark,
  width: 45,
  height: 45,
}))``;

export const Subtitle = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral600,
}))`
  ${({ theme }) => css`
    text-align: center;
    padding: ${theme.spacing.xs}px 0;
  `}
`;
