import { useCallback, useMemo, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppRoute, nav, PlacesManagerStackParamList } from '@navigation/index';
import { useDispatch, useSelector } from 'react-redux';
import { placesManagerActions } from '@store/modules/placesManager/placesManagerActions';
import { placesManagerSelectors } from '@store/modules/placesManager/placesManagerSelectors';
import { IHome } from '@store/modules/placesManager/placesManagerTypes';
import { modalActions } from '@store/modules/generic/modal/modalActions';
import { ECallToActionActionType } from '@store/modules/callToAction/callToActionTypes';
import {
  EModalActionTypes,
  EModalType,
} from '@store/modules/generic/modal/modalTypes';

type HouseManagementRouteProp = RouteProp<
  PlacesManagerStackParamList,
  AppRoute.HouseManagement
>;

export const useHouseManagement = () => {
  const dispatch = useDispatch();
  const route = useRoute<HouseManagementRouteProp>();

  const homeId = useMemo(() => {
    return route.params?.homeId;
  }, [route.params?.homeId]);

  const homeData: IHome | undefined = useSelector(
    placesManagerSelectors.getHomeById(`${homeId}`),
  );

  const [homeName, setHomeName] = useState<string>(homeData?.name ?? '');
  const [canSave, setCanSave] = useState(true);

  const handleChangeName = useCallback((value: string) => {
    if (value) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
    setHomeName(value);
  }, []);

  const handleSave = useCallback(() => {
    if (homeData) {
      dispatch(
        placesManagerActions.updateHomeRequest({ ...homeData, name: homeName }),
      );
    } else {
      dispatch(placesManagerActions.addHomeRequest(homeName));
    }
  }, [dispatch, homeData, homeName]);

  const handleGoback = useCallback(() => {
    if (homeName !== homeData?.name && homeName !== '') {
      dispatch(
        modalActions.showModal({
          type: EModalType.FOOTER,
          title: 'Descartar alteração?',
          subtitle:
            'As mudanças feitas até aqui não foram salvas. Se você sair, elas serão descartadas.',
          primaryButton: {
            label: 'Continuar editando',
            actionType: ECallToActionActionType.SAGA,
            action: EModalActionTypes.CLOSE_MODAL,
          },
          secondaryButton: {
            label: 'Descartar alteração',
            actionType: ECallToActionActionType.GO_BACK,
          },
        }),
      );
    } else {
      nav.back();
    }
  }, [dispatch, homeData?.name, homeName]);

  return {
    homeId: route?.params?.homeId,
    homeName,
    canSave,
    handleChangeName,
    handleSave,
    handleGoback,
  };
};
