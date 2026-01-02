import { Text } from '@components/atoms/Text';
import { Button } from '@components/molecules/Button';
import { css } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.global};
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

export const Header = styled.View`
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Title = styled(Text)`
  padding-top: 24px;
`;

export const Subtitle = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral600,
}))`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}px 0;
  `}
`;

export const Buttons = styled(Button)`
  margin-top: 16px;
`;
