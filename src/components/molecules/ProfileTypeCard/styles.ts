import styled, { css, DefaultTheme } from 'styled-components/native';
import { Text } from '@components/atoms/Text';

import { ProfileTypeCardProps } from './types';

type ContainerProps = Pick<ProfileTypeCardProps, 'selected' | 'disabled'>;

const containerModifier = {
  default: (theme: DefaultTheme) => css`
    border-color: ${theme.colors.neutrals.neutral200};
    background-color: ${theme.colors.background.surface};
  `,
  selected: (theme: DefaultTheme) => css`
    border-color: ${theme.colors.secondary.base};
    background-color: ${theme.colors.background.global};
  `,
  disabled: (theme: DefaultTheme) => css`
    opacity: 0.4;
  `,
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  ${({ theme, selected, disabled }) => css`
    flex-direction: row;
    align-items: center;
    padding: ${theme.spacing.lg}px;
    border-radius: ${theme.radii.lg}px;
    border-width: 1px;
    gap: ${theme.spacing.md}px;

    ${containerModifier.default(theme)}
    ${selected && containerModifier.selected(theme)}
    ${disabled && containerModifier.disabled(theme)}
  `}
`;

export const IconWrapper = styled.View`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    border-radius: ${theme.radii.full}px;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.secondary.lightest};
  `}
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled(Text).attrs(({ theme }) => ({
  variant: 'bodyMediumBold',
  color: theme.colors.neutrals.neutral900,
}))``;

export const Description = styled(Text).attrs(({ theme }) => ({
  variant: 'bodySmallRegular',
  color: theme.colors.neutrals.neutral600,
  numberOfLines: 2,
}))``;

type RadioProps = Pick<ProfileTypeCardProps, 'selected'>;

export const RadioOuter = styled.View<RadioProps>`
  ${({ theme, selected }) => css`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${selected
      ? theme.colors.secondary.base
      : theme.colors.neutrals.neutral300};
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.background.surface};
  `}
`;

export const RadioInner = styled.View<RadioProps>`
  ${({ theme, selected }) =>
    selected &&
    css`
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: ${theme.colors.secondary.base};
    `}
`;
