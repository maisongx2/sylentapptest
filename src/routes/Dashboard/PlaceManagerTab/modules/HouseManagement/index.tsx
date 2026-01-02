import React from 'react';
import * as S from './styles';
import { useHouseManagement } from './useHouseManagement';
import { EButtonType } from '@components/molecules/Button/styles';
import { NavigationHeader } from '@components/molecules/NavigationHeader';
import { InputField } from '@components/organisms/InputField';

export const HouseManagement = () => {
  const {
    homeId,
    homeName,
    canSave,
    handleChangeName,
    handleGoback,
    handleSave,
  } = useHouseManagement();

  return (
    <S.Container>
      <NavigationHeader
        headerText={homeId ? 'EDITAR CASA' : 'ADICIONAR NOVA CASA'}
        goBack={handleGoback}
      />
      <S.Content>
        {!homeId && (
          <S.Header>
            <S.Title variant="headingSmall">Dê um nome para sua casa</S.Title>
            <S.Subtitle variant="bodyLargeRegular">
              Isso ajuda você a identificar suas casas e dispositivos no app.
            </S.Subtitle>
          </S.Header>
        )}
        <InputField
          label="Nome da casa"
          value={homeName}
          required
          onChangeText={handleChangeName}
          placeholder="Casa de praia, apartamento centro"
          type="text"
          autoCapitalize="words"
        />
        <S.Buttons
          onPress={handleSave}
          buttonType={EButtonType.PRIMARY}
          label={'Salvar'}
          disabled={canSave}
        />
        <S.Buttons
          onPress={handleGoback}
          buttonType={EButtonType.SECONDARY}
          label={'Cancelar'}
        />
      </S.Content>
    </S.Container>
  );
};
