import { Text } from '@components/atoms/Text';
import { Platform } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: space-between;
    background-color: ${theme.colors.background.global};
    padding: 16px;
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm}px 0;
    padding-top: 58px;
  `}
`;

export const Description = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral600,
}))`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}px 0;
  `}
`;

export const SocialMediaContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 40px;
    margin-bottom: 20px;
    gap: ${theme.spacing.md}px;
  `}
`;

export const FormContainer = styled.View`
  ${({ theme }) => css`
    justify-content: flex-end;
  `}
`;

export const InputContainer = styled.View`
  ${({ theme }) => css`
    gap: 31px;
  `}
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    align-items: flex-end;
    padding: 20px 0;
  `}
`;

export const ForgotPasswordLabel = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral900,
}))`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}px 0;
  `}
`;

export const SiginUpButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  `}
`;

export const SiginUpLabel = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral600,
}))`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}px 0;
  `}
`;

export const SiginBoldLabel = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.neutrals.neutral900,
}))`
  ${({ theme }) => css`
    padding: ${theme.spacing.xs}px 0;
  `}
`;

export const DividerContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  margin: 4px 0;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const DividerLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.neutrals.neutral900};
  text-align: center;
`;
