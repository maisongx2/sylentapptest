import styled from 'styled-components/native';

export const Container = styled.View`
  height: 200px;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
`;

export const BannerImage = styled.Image<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 200px;
`;

export const DotsContainer = styled.View`
  position: absolute;
  bottom: 16px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) =>
    active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  margin: 0 4px;
`;
