import styled from 'styled-components/native';
import { ChevronLeft } from 'lucide-react-native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.background.global};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const BackButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: -8px;
`;

export const BackIcon = styled(ChevronLeft).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.neutrals.neutral900,
}))``;

export const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const RightButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: -8px;
`;

export const RightSpacer = styled.View`
  width: 40px;
`;
