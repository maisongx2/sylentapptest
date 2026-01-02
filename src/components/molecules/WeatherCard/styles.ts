import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background.global};
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 12px;
`;

export const ErrorContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  gap: 12px;
`;

export const RetryButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #e8f4f8;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const TemperatureRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 12px;
`;

export const TemperatureContainer = styled.View``;

export const IconContainer = styled.View`
  background-color: #e8f4f8;
  border-radius: 50px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const DetailsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px 0;
  margin-top: 8px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const DetailItem = styled.View`
  align-items: center;
  gap: 4px;
`;

export const Divider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.neutrals.neutral200};
`;

export const DescriptionRow = styled.View`
  margin-top: 8px;
  align-items: center;
`;
