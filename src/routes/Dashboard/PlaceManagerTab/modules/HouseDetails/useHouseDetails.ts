import { AppRoute, nav } from '@navigation/index';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ECallToActionActionType } from '@store/modules/callToAction/callToActionTypes';
import { modalActions } from '@store/modules/generic/modal/modalActions';
import {
  EModalActionTypes,
  EModalType,
} from '@store/modules/generic/modal/modalTypes';
import { placesManagerSelectors } from '@store/modules/placesManager/placesManagerSelectors';
import {
  EPlacesManagerActionTypes,
  IRoom,
} from '@store/modules/placesManager/placesManagerTypes';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoomCardProps } from './types';
import { icons } from 'lucide-react-native';

type HouseDetailsRouteProp = RouteProp<any, 'HouseDetails'>;

export const useHouseDetails = () => {
  const selectedHome = useSelector(placesManagerSelectors.getSelectedHome);
  const homeId = selectedHome?.homeId;

  const dispatch = useDispatch();

  const handleGoBack = () => {
    nav.back();
  };

  const handleAddRoom = () => {
    console.log('Adicionar cômodo');
    nav.to(AppRoute.AddRoom, { homeId });
  };

  const handleRoomPress = (roomId: string) => {
    console.log('Navegar para cômodo:', roomId);
    // nav.to('RoomDetails', { roomId });
  };

  const handleEditRoom = useCallback((roomId: string) => {
    console.log('Editar cômodo:', roomId);
    // nav.to('EditRoom', { roomId });
  }, []);

  const handleDeleteRoom = useCallback(
    ({ roomId, devices }: IRoom) => {
      console.log('Excluir cômodo:', roomId);
      dispatch(
        modalActions.showModal({
          type: EModalType.FOOTER,
          title: 'Excluir cômodo?',
          subtitle: `Esta ação não poderá ser desfeita.Os (${devices.length}) dispositivos vinculados a este cômodo serão excluídos.`,
          primaryButton: {
            actionType: ECallToActionActionType.SAGA,
            label: 'Cancelar',
            action: EModalActionTypes.CLOSE_MODAL,
          },
          secondaryButton: {
            actionType: ECallToActionActionType.SAGA,
            label: 'Excluir room',
            action: EPlacesManagerActionTypes.DELETE_ROOM_REQUEST,
            params: { roomId, homeId },
          },
        }),
      );
    },
    [dispatch, homeId],
  );

  const houseData = useSelector(placesManagerSelectors.getHomeById(homeId!));

  const rooms: RoomCardProps[] = useMemo(
    () =>
      houseData?.rooms.map(room => ({
        id: room.roomId,
        name: room.name,
        icon: { name: room.icon as keyof typeof icons },
        devicesCount: room.devices.length,
        hasSubRooms: false,
        dropDownMenuActions: [
          {
            label: 'Editar cômodo',
            icon: { name: 'Pencil' },
            onPress: () => handleEditRoom(room.roomId),
          },
          {
            label: 'Excluir cômodo',
            icon: { name: 'Trash2' },
            variant: 'destructive' as const,
            onPress: () => handleDeleteRoom(room),
          },
        ],
      })) ?? [],
    [handleDeleteRoom, handleEditRoom, houseData],
  );

  const houseName = useMemo(() => {
    return houseData?.name;
  }, [houseData?.name]);

  return {
    houseName,
    rooms,
    handleGoBack,
    handleAddRoom,
    handleRoomPress,
  };
};
