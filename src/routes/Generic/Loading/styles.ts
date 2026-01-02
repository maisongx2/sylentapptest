import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const GifBackground = styled(FastImage)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
