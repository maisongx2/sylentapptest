import styled from 'styled-components/native';
import { Home, MoreVertical } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

// Sombra externa via StyleSheet (mais confiável no iOS)
const shadowStyle = StyleSheet.create({
  shadow: {
    shadowColor: '#101828',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export const ShadowWrapper = styled.View.attrs({
  style: shadowStyle.shadow,
})`
  margin-top: 16px;
  border-radius: 6px;
  background-color: transparent;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: 6px;
  padding: 16px;
  width: 100%;
  overflow: visible;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(53, 143, 177, 0.1);
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
