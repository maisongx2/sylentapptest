import styled from 'styled-components/native';
import {
  IconWrapperProps,
  isDestructiveProps,
  MenuContainerProps,
} from './types';
import { Text } from '@components/atoms/Text';
import { Icon } from '@components/atoms/Icon';

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const MenuContainer = styled.View.attrs<MenuContainerProps>(
  ({ theme }) => ({
    style: {
      shadowColor: theme.colors.neutrals.neutral900,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
  }),
)<MenuContainerProps>`
  background-color: ${({ theme }) => theme.colors.background.global};
  border-radius: 6px;
  padding: 10px 12px;
  min-width: 200px;

  ${({ buttonPosition, width }) =>
    buttonPosition &&
    `
    position: absolute;
    top: ${buttonPosition.y + buttonPosition.height + 4}px;
    left: ${buttonPosition.x + buttonPosition.width - (width ?? 0)}px;
  `}
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.neutrals.neutral200};
  margin: 4px 0;
`;

export const IconWrapper = styled.View<IconWrapperProps>`
  margin-right: 12px;
  color: ${({ theme, variant }) => {
    if (variant === 'destructive') {
      return theme.colors.semantic.error;
    }
    return theme.colors.neutrals.neutral900;
  }};
`;

export const TextOption = styled(Text).attrs<isDestructiveProps>(
  ({ theme, isDestructive }) => ({
    color: isDestructive
      ? theme.colors.semantic.error
      : theme.colors.neutrals.neutral900,
    variant: 'bodyMediumRegular',
  }),
)``;

export const IconOption = styled(Icon).attrs<isDestructiveProps>(
  ({ theme, isDestructive }) => ({
    color: isDestructive
      ? theme.colors.semantic.error
      : theme.colors.neutrals.neutral900,
  }),
)``;
