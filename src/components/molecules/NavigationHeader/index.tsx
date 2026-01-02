import React from 'react';
import * as S from './styles';
import { Text } from '@components/atoms/Text';
import { NavigationHeaderProps } from './types';
import { Icon } from '@components/atoms/Icon';

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  headerText,
  goBack,
  rightAction,
}) => {
  return (
    <S.Container>
      {goBack && (
        <S.BackButton onPress={goBack}>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.TitleContainer>
        <Text variant="bodyMediumBold">{headerText}</Text>
      </S.TitleContainer>

      {rightAction && (
        <S.RightButton onPress={rightAction.onPress}>
          <Icon {...rightAction.icon} />
        </S.RightButton>
      )}
    </S.Container>
  );
};
