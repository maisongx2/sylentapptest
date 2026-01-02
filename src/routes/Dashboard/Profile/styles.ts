import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.global};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const UserSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const UserInfo = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const UserName = styled.Text`
  margin-bottom: 4px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals.neutral600};
`;

export const MenuList = styled.View`
  gap: 0px;
`;
