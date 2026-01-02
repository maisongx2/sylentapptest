import { AppRoute, nav } from '@navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import { placesManagerSelectors } from '@store/modules/placesManager/placesManagerSelectors';
import { HouseCardProps } from '@components/molecules/HouseCard/types';
import { modalActions } from '@store/modules/generic/modal/modalActions';
import {
  EModalActionTypes,
  EModalType,
} from '@store/modules/generic/modal/modalTypes';
import { ECallToActionActionType } from '@store/modules/callToAction/callToActionTypes';
import { EPlacesManagerActionTypes } from '@store/modules/placesManager/placesManagerTypes';
import { useCallback, useMemo } from 'react';

export const useHouseList = () => {
  const dispatch = useDispatch();
  const homesData = useSelector(placesManagerSelectors.getAllHomes);

  const handleGoback = () => {
    nav.back();
  };

  const handleEditHouse = (homeId: string) => {
    nav.to(AppRoute.PlacesManagerTabStack, {
      screen: AppRoute.HouseManagement,
      params: { homeId },
    });
  };

  const handleDeleteHouse = useCallback(
    (homeId: string) => {
      dispatch(
        modalActions.showModal({
          type: EModalType.FOOTER,
          title: 'Atenção! Exclusão permanente',
          subtitle:
            'Excluir esta casa apagará todos os cômodos e dispositivos conectados a la.\nDeseja continuar?',
          primaryButton: {
            actionType: ECallToActionActionType.SAGA,
            label: 'Cancelar',
            action: EModalActionTypes.CLOSE_MODAL,
          },
          secondaryButton: {
            actionType: ECallToActionActionType.SAGA,
            label: 'Excluir casa',
            action: EPlacesManagerActionTypes.DELETE_HOME_REQUEST,
            params: { homeId },
          },
        }),
      );
    },
    [dispatch],
  );

  const houseCards: HouseCardProps[] = useMemo(
    () =>
      homesData.map(home => {
        return {
          id: home.homeId,
          name: home.name,
          devicesCount: home.rooms.length,
          dropDownMenuActions: [
            {
              id: home.homeId,
              label: 'Editar casa',
              icon: { name: 'Pencil' },
              onPress: () => handleEditHouse(home.homeId),
            },
            {
              id: home.homeId,
              label: 'Excluir casa',
              icon: { name: 'Trash2' },
              variant: 'destructive',
              onPress: () => handleDeleteHouse(home.homeId),
            },
          ],
        };
      }),
    [handleDeleteHouse, homesData],
  );

  return {
    houseCards,
    handleGoback,
  };
};
