import React from 'react';
import * as S from './styles';
import { usePlaceManager } from './usePlaceManager';
import { DividerLine } from '@components/atoms/DividerLine';
import { EmptyList } from '@components/templates/EmptyList';
import { Icon } from '@assets/icons';
import { ECallToActionActionType } from '@store/modules/callToAction/callToActionTypes';

export const PlaceManager = () => {
  const { selectedHome } = usePlaceManager();

  return (
    <S.Container>
      <S.SelectedHome variant="bodySmallBold">
        {selectedHome?.name ?? 'Meus comodos'}{' '}
      </S.SelectedHome>
      <DividerLine />
      <EmptyList
        icon={Icon.door}
        title="Nenhum cômodo cadastrado"
        subtitle="Para começar, cadastre uma casa e depois adicione seus cômodos."
        primaryButton={{
          label: 'Cadastrar casa',
          actionType: ECallToActionActionType.NAVIGATE,
        }}
      />
    </S.Container>
  );
};
