import { Platform } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';
import { Text } from '@components/atoms/Text';

export const Container = styled.View`
  z-index: 1000;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

export const Overlay = styled.TouchableOpacity`
  flex: 1;
`;
export const DropdownContainer = styled.View.attrs(() => ({
  style: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  }),
}))`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background.surface};
  width: 50%;
  left: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

export const OptionItem = styled.TouchableOpacity`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.neutrals.neutral200};
  `}
`;

export const OptionIconContainer = styled.View`
  margin-right: 12px;
`;

export const HouseLabel = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.neutrals.neutral900};
    margin-right: ${theme.spacing.sm}px;
  `}
`;
