import React from 'react';
import * as S from './styles';
import type { EmptyListProps } from './types';
import { useEmptyList } from './useEmptyList';
import { Button } from '@components/molecules/Button';
import { EButtonType } from '@components/molecules/Button/styles';

export const EmptyList = (props: EmptyListProps) => {
  const { handleButtonPress } = useEmptyList(props);

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          {props.icon && (
            <S.IconContainer>
              <S.BigIcon icon={props.icon} />
            </S.IconContainer>
          )}
          <S.Title variant="headingSmall">{props.title}</S.Title>
          <S.Subtitle variant="bodyLargeRegular">{props.subtitle}</S.Subtitle>
        </S.Header>
        {props.primaryButton && (
          <Button
            onPress={() => handleButtonPress(props.primaryButton)}
            buttonType={EButtonType.PRIMARY}
            label={props.primaryButton.label}
          />
        )}
        {props?.secondaryButton && (
          <Button
            onPress={() => handleButtonPress(props?.secondaryButton)}
            buttonType={EButtonType.PRIMARY}
            label={props.secondaryButton.label}
          />
        )}
      </S.Content>
    </S.Container>
  );
};
