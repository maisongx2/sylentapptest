// src/routes/SignUp/styles.ts
import styled, { css, DefaultTheme } from 'styled-components/native';
import { Text } from '@components/atoms/Text';
import { PasswordStrength } from './types';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background.global};
  `}
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
  showsVerticalScrollIndicator: false,
})`
  ${({ theme }) => css`
    padding: ${theme.spacing.lg}px;
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    flex: 1;
    margin: ${theme.spacing.xl}px 0;
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral900};
    margin-bottom: ${theme.spacing.sm}px;
  `}
`;

export const Description = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral600};
  `}
`;

export const SocialMediaContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${theme.spacing.xl}px;
    margin-bottom: ${theme.spacing.lg}px;
    gap: ${theme.spacing.sm}px;
  `}
`;

export const DividerContainer = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${theme.spacing.lg}px;
  `}
`;

export const DividerLine = styled.View`
  ${({ theme }) => css`
    flex: 1;
    height: 1px;
    background-color: ${theme.colors.neutrals.neutral200};
  `}
`;

export const DividerLabel = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral600};
    margin: 0 ${theme.spacing.md}px;
  `}
`;

export const SectionLabel = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral900};
    margin-bottom: ${theme.spacing.xs}px;
  `}
`;

export const ProfileTypeContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.spacing.sm}px;
    margin-bottom: ${theme.spacing.lg}px;
  `}
`;

export const InputContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.spacing.sm}px;
    margin-bottom: ${theme.spacing.lg}px;
  `}
`;

export const PasswordSection = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.sm}px;
    margin-bottom: ${theme.spacing.lg}px;
  `}
`;

export const PasswordStrengthLabelRow = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.xs}px;
  `}
`;

export const PasswordStrengthLabel = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral900};
  `}
`;

const passwordStrengthValueModifier = {
  none: (theme: DefaultTheme) => css`
    color: ${theme.colors.neutrals.neutral700};
  `,
  weak: (theme: DefaultTheme) => css`
    color: ${theme.colors.semantic.error};
  `,
  medium: (theme: DefaultTheme) => css`
    color: ${theme.colors.semantic.warning || theme.colors.neutrals.neutral700};
  `,
  strong: (theme: DefaultTheme) => css`
    color: ${theme.colors.semantic.success};
  `,
};

export const PasswordStrengthValue = styled(Text)<{
  strength: PasswordStrength;
}>`
  ${({ theme, strength }) => css`
    ${passwordStrengthValueModifier[strength](theme)}
  `}
`;

export const PasswordStrengthBarBackground = styled.View`
  ${({ theme }) => css`
    height: 6px;
    border-radius: 999px;
    background-color: ${theme.colors.neutrals.neutral200};
    overflow: hidden;
  `}
`;

const passwordStrengthBarModifier = {
  none: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutrals.neutral300};
  `,
  weak: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.semantic.error};
  `,
  medium: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.semantic.warning || '#F59E0B'};
  `,
  strong: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.semantic.success};
  `,
};

export const PasswordStrengthBarFill = styled.View<{
  progress: number;
  strength: PasswordStrength;
}>`
  ${({ theme, progress, strength }) => css`
    height: 100%;
    width: ${progress}%;
    transition: width 0.3s ease, background-color 0.3s ease;

    ${passwordStrengthBarModifier[strength](theme)}
  `}
`;

export const PasswordRequirements = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.sm}px;
    gap: ${theme.spacing.xs}px;
  `}
`;

const requirementItemModifier = {
  error: (theme: DefaultTheme) => css`
    color: ${theme.colors.neutrals.neutral700};
  `,
  success: (theme: DefaultTheme) => css`
    color: ${theme.colors.semantic.success};
  `,
};

export const RequirementItem = styled(Text)<{ hasError?: boolean }>`
  ${({ theme, hasError }) => css`
    ${requirementItemModifier[hasError ? 'error' : 'success'](theme)}
  `}
`;

export const TermsRow = styled.TouchableOpacity`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    margin: ${theme.spacing.sm}px 0;
  `}
`;

const termsCheckboxModifier = {
  checked: (theme: DefaultTheme) => css`
    border-color: ${theme.colors.secondary.base};
    background-color: ${theme.colors.secondary.base};
  `,
  unchecked: (theme: DefaultTheme) => css`
    border-color: ${theme.colors.neutrals.neutral400};
    background-color: ${theme.colors.background.surface};
  `,
};

export const TermsCheckbox = styled.View<{ checked: boolean }>`
  ${({ theme, checked }) => css`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border-width: 1px;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing.sm}px;
    margin-top: 2px;

    ${termsCheckboxModifier[checked ? 'checked' : 'unchecked'](theme)}
  `}
`;

export const VerifyButton = styled.TouchableOpacity`
  background-color: #1e88e5;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const VerifyButtonText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-weight: 600;
`;

export const CheckIcon = styled.View`
  ${({ theme }) => css`
    width: 12px;
    height: 12px;
  `}
`;

export const TermsText = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral700};
    line-height: 20px;
  `}
`;

export const TermsLink = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary.base};
  `}
`;

export const TermsError = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.semantic.error};
    margin-top: -${theme.spacing.md}px;
    margin-bottom: ${theme.spacing.sm}px;
  `}
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.lg}px;
    margin-bottom: ${theme.spacing.lg}px;
  `}
`;

export const BottomText = styled(Text)`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.neutrals.neutral700};
  `}
`;

export const BottomLink = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary.base};
  `}
`;
