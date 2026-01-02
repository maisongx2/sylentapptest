import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.global};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const SectionHeader = styled.View`
  margin-bottom: 16px;
`;

export const RoomList = styled.View`
  gap: 0px;
`;
