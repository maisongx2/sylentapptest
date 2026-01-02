import { Spinner } from '@components/atoms/Spinner';
import { Text } from '@components/atoms/Text';
import { css } from 'styled-components';
import styled, { DefaultTheme } from 'styled-components/native';

export enum EButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text',
}

type TProps = {
  buttonType: EButtonType;
  full?: boolean;
  disabled?: boolean;
  isPressed?: boolean;
};

const containerDisabledModifier = {
  [EButtonType.PRIMARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondary.dark};
    border-color: ${theme.colors.secondary.dark};
  `,
  [EButtonType.SECONDARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutrals.neutral400};
    border-color: ${theme.colors.neutrals.neutral400};
  `,
  [EButtonType.TEXT]: (_theme: DefaultTheme) => css`
    opacity: 0.7;
  `,
};

const containerPressedModifier = {
  [EButtonType.PRIMARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondary.light};
    border-color: ${theme.colors.secondary.light};
  `,
  [EButtonType.SECONDARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutrals.neutral300};
    border-color: ${theme.colors.neutrals.neutral300};
  `,
  [EButtonType.TEXT]: (_theme: DefaultTheme) => css`
    opacity: 0.7;
  `,
};

const containerModifier = {
  [EButtonType.PRIMARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.secondary.dark};
    border-color: ${theme.colors.secondary.base};
  `,
  [EButtonType.SECONDARY]: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.neutrals.neutral50};
    border-color: ${theme.colors.neutrals.neutral300};
  `,
  [EButtonType.TEXT]: (theme: DefaultTheme) => css`
    background-color: transparent;
    border-color: transparent;
    padding-left: 0px;
    padding-right: 0px;
    height: auto;
  `,
};

const labelModifier = {
  [EButtonType.PRIMARY]: (theme: DefaultTheme) =>
    theme.colors.neutrals.neutral50,

  [EButtonType.SECONDARY]: (theme: DefaultTheme) =>
    theme.colors.neutrals.neutral900,

  [EButtonType.TEXT]: (theme: DefaultTheme) => theme.colors.secondary.base,
};

export const Container = styled.Pressable<TProps>`
  ${({ theme, buttonType, full, disabled, isPressed }) => css`
    width: 100%;
    height: 44px;
    padding: 0 ${theme.spacing.lg}px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    ${full && 'width: 100%;'}

    /* base (reset) */
    background-color: transparent;
    border-width: 1px;
    border-color: transparent;
    ${containerModifier[buttonType](theme)}

    ${!disabled && isPressed && containerPressedModifier[buttonType](theme)}

    ${disabled && containerDisabledModifier[buttonType](theme)};
  `}
`;

export const Label = styled(Text).attrs<TProps>(({ theme, buttonType }) => ({
  color: labelModifier[buttonType](theme),
}))<TProps>`
  ${({ disabled }) => css`
    opacity: ${disabled ? 0.4 : 1};
  `}
`;

export const Loader = styled(Spinner).attrs<TProps>(
  ({ theme, buttonType }) => ({
    strokeColor: labelModifier[buttonType](theme),
  }),
)<TProps>`
  ${({ disabled }) => css`
    opacity: ${disabled ? 0.4 : 1};
  `}
`;
