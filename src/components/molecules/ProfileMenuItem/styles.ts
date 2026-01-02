import styled from 'styled-components/native';
import { ChevronRight, LucideProps } from 'lucide-react-native';
import { ComponentType } from 'react';
import { VariantProps } from './types';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const IconWrapper = styled.View<VariantProps>`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  color: ${({ theme, variant }) =>
    variant === 'danger'
      ? theme.colors.semantic.error
      : theme.colors.neutrals.neutral900};
`;

export const Label = styled.Text<VariantProps>`
  flex: 1;
  font-size: 16px;
  color: ${({ theme, variant }) =>
    variant === 'danger'
      ? theme.colors.semantic.error
      : theme.colors.neutrals.neutral900};
`;

export const ChevronIcon = styled(ChevronRight).attrs<VariantProps>(
  ({ theme, variant }) => ({
    size: 20,
    color:
      variant === 'danger'
        ? theme.colors.semantic.error
        : theme.colors.neutrals.neutral600,
  }),
)<VariantProps>``;

export const IconOption = (Icon: ComponentType<LucideProps>) =>
  styled(Icon).attrs<VariantProps>(({ theme, variant }) => ({
    color:
      variant === 'danger'
        ? theme.colors.semantic.error
        : theme.colors.neutrals.neutral900,
  }))``;
