import styled from 'styled-components/native';
import { Text } from '@components/atoms/Text';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.global};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Header = styled.View`
  margin-bottom: 32px;
  gap: 8px;
`;

export const Form = styled.View`
  gap: 24px;
`;

export const Field = styled.View`
  gap: 8px;
`;

export const Label = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const RequiredMark = styled(Text).attrs(({ theme }) => ({
  color: theme.colors.semantic.error,
  variant: 'bodySmallBold',
}))`
  margin-left: 2px;
`;

export const ErrorText = styled(Text).attrs(({ theme }) => ({
  variant: 'bodyExtraSmallRegular',
  color: theme.colors.semantic.error,
}))`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const IconPreview = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const IconPreviewContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary.lightest};
  align-items: center;
  justify-content: center;
`;

export const Actions = styled.View`
  margin-top: 32px;
  gap: 16px;
`;
