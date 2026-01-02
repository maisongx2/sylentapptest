import React from 'react';
import { useModal } from './useModal';
import { Modal as RNModal } from 'react-native';
import * as S from './styles';
import { EButtonType } from '@components/molecules/Button/styles';
import { IconSvg } from '@components/atoms/IconSvg';

export const Modal = () => {
  const { data, visible, isFullscreen, handleClose, handleButtonPress } =
    useModal();

  if (!visible || !data) return <></>;

  return (
    <RNModal
      transparent
      visible
      animationType="fade"
      statusBarTranslucent
    >
      <S.Container isFullscreen={isFullscreen}>
        <S.Overlay />
        <S.Content isFullscreen={isFullscreen}>
          <S.Header>
            {data.icon && (
              <S.IconContainer>
                <IconSvg icon={data.icon} width={45} height={45} />
              </S.IconContainer>
            )}
            <S.Title variant={isFullscreen ? 'headingSmall' : 'bodyMediumBold'}>
              {data.title}
            </S.Title>
            <S.Subtitle
              variant={isFullscreen ? 'bodyLargeRegular' : 'bodyMediumRegular'}
            >
              {data.subtitle}
            </S.Subtitle>
          </S.Header>
          {data.primaryButton && (
            <S.OptionButton
              onPress={() => handleButtonPress(data.primaryButton)}
              buttonType={EButtonType.PRIMARY}
              label={data.primaryButton.label}
            />
          )}
          {data?.secondaryButton && (
            <S.OptionButton
              onPress={() => handleButtonPress(data?.secondaryButton)}
              buttonType={EButtonType.SECONDARY}
              label={data.secondaryButton.label}
            />
          )}
          {data.closeButton && (
            <S.OptionButton
              onPress={handleClose}
              buttonType={EButtonType.TEXT}
              label={'Fechar'}
            />
          )}
        </S.Content>
      </S.Container>
    </RNModal>
  );
};
