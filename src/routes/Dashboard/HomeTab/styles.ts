import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const Header = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.global};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.neutrals.neutral200};
  z-index: 1000;
`;

export const AddButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.neutrals.neutral200};
  align-items: center;
  justify-content: center;
`;

export const AddMenuContainer = styled.View`
  position: absolute;
  top: 60px;
  right: 16px;
  background-color: ${({ theme }) => theme.colors.background.global};
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
  padding: 8px 0;
  min-width: 200px;
`;

export const AddMenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const AddMenuIconContainer = styled.View`
  margin-right: 12px;
`;

export const Section = styled.View`
  padding: 16px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const EditButton = styled.TouchableOpacity`
  padding: 8px;
`;
