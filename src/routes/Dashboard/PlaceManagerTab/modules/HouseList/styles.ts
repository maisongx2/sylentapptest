import styled from 'styled-components/native';
import { Home, MoreVertical } from 'lucide-react-native';
import { HouseCardProps } from '@components/molecules/HouseCard/types';
import { FlatList, FlatListProps } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.global};
`;

export const Content = styled(
  FlatList as new (
    props: FlatListProps<HouseCardProps>,
  ) => FlatList<HouseCardProps>,
).attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 0 16px;
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const HouseIcon = styled(Home).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.secondary.dark,
}))``;

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
