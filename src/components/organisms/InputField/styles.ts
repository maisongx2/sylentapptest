import styled, { css, DefaultTheme } from 'styled-components/native';
import { Text } from '@components/atoms/Text';
import { InputFieldStatus } from './types';
import { TextInput as RNTextInput } from 'react-native';

type WrapperProps = {
  status: InputFieldStatus;
  isFocused: boolean;
  multiline?: boolean;
};

const getBorderColor = (
  theme: DefaultTheme,
  status: InputFieldStatus,
  isFocused: boolean,
) => {
  if (status === 'disabled') return theme.colors.neutrals.neutral200;
  if (status === 'error') return theme.colors.semantic.error;
  if (isFocused) return theme.colors.secondary.base;
  return theme.colors.neutrals.neutral200;
};

const getBackgroundColor = (theme: DefaultTheme, status: InputFieldStatus) => {
  if (status === 'disabled') return theme.colors.neutrals.neutral100;
  return theme.colors.background.surface;
};

export const Container = styled.View`
  width: 100%;
`;

export const LabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const LabelText = styled(Text).attrs({
  variant: 'bodySmallBold',
})``;

export const RequiredMark = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.semantic.error,
  variant: 'bodySmallBold',
}))`
  margin-left: 2px;
`;

export const InputWrapper = styled.View<WrapperProps>`
  ${({ theme, status, isFocused, multiline }) => css`
    flex-direction: row;
    align-items: ${multiline ? 'flex-start' : 'center'};
    border-width: 1px;
    border-radius: 6px;
    padding: ${multiline ? theme.spacing.sm : 0}px ${theme.spacing.md}px;
    height: ${multiline ? 'auto' : '44px'};
    min-height: ${multiline ? '80px' : '44px'};
    background-color: ${getBackgroundColor(theme, status)};
    border-color: ${getBorderColor(theme, status, isFocused)};
  `}
`;

export const StyledTextInput = styled(RNTextInput)<{
  status: InputFieldStatus;
}>`
  flex: 1;
  color: ${({ theme, status }) =>
    status === 'disabled'
      ? theme.colors.neutrals.neutral400
      : theme.colors.neutrals.neutral900};
  padding: 0;
`;

export const LeftIconContainer = styled.View`
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const RightIconButton = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.spacing.sm}px;
`;

export const HelperText = styled(Text).attrs({
  variant: 'bodyExtraSmallRegular',
})`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.neutrals.neutral500};
`;

export const ErrorText = styled(Text).attrs(({ theme }) => ({
  variant: 'bodyExtraSmallRegular',
  color: theme.colors.semantic.error,
}))`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const ErrorRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const ErrorIconContainer = styled.View`
  margin-right: ${({ theme }) => theme.spacing.xs}px;
`;
