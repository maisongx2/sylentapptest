import styled from 'styled-components/native';
import { MoreVertical, ChevronRight } from 'lucide-react-native';

interface ContainerProps {
  selected?: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary.base : theme.colors.neutrals.neutral200};
  background-color: ${({ theme }) => theme.colors.background.surface};
  margin-bottom: 12px;
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary.lightest};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: ${({ theme }) => theme.colors.primary.base};
`;

export const InfoContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const MenuButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const MenuIcon = styled(MoreVertical).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.neutrals.neutral600,
}))``;

export const ChevronIcon = styled(ChevronRight).attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.neutrals.neutral600,
}))``;
