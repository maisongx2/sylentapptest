import styled, { css, DefaultTheme } from 'styled-components/native';
import { Text } from '@components/atoms/Text';
import { EIconButtonType } from './types';

const containerModifier = {
  [EIconButtonType.PRIMARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondary.base};
    border-color: ${theme.colors.secondary.base};
  `,
  [EIconButtonType.SECONDARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutrals.neutral50};
    border-color: ${theme.colors.neutrals.neutral300};
  `,
  [EIconButtonType.TEXT]: () => css`
    background-color: transparent;
    border-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
  `,
};

const labelModifier = {
  [EIconButtonType.PRIMARY]: (theme: DefaultTheme) =>
    theme.colors.neutrals.neutral50,

  [EIconButtonType.SECONDARY]: (theme: DefaultTheme) =>
    theme.colors.neutrals.neutral900,

  [EIconButtonType.TEXT]: (theme: DefaultTheme) => theme.colors.secondary.base,
};

export const Container = styled.TouchableOpacity<{
  full?: boolean;
  disabled?: boolean;
  type: EIconButtonType;
}>`
  ${({ theme, full, disabled, type }) => css`
    flex: ${full ? 1 : 0};
    min-height: 44px;
    padding: ${theme.spacing.md}px;
    border-radius: ${theme.radii.md}px;
    border-width: 1px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: ${disabled ? 0.5 : 1};

    ${containerModifier[type](theme)};
  `}
`;

export const Label = styled(Text).attrs<{
  type: EIconButtonType;
}>(({ theme, type }) => ({
  color: labelModifier[type](theme),
}))`
  ${({ theme }) => css`
    margin: ${theme.spacing.sm}px;
  `}
`;
