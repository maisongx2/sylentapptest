import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  PlacesManagerAction,
  EPlacesManagerActionTypes,
  IPlacesManagerData,
  IHome,
} from './placesManagerTypes';
import { placesManagerActions } from './placesManagerActions';
import { placesManagerSelectors } from './placesManagerSelectors';
import { AppRoute, nav } from '@navigation/index';
import { errorScreenActions } from '../generic/errorSreen/errorScreenActions';
import { ECallToActionActionType } from '../callToAction/callToActionTypes';
import { modalActions } from '../generic/modal/modalActions';
import { EModalType } from '../generic/modal/modalTypes';
import TuyaService from '@native-modules/tuya/TuyaModule';
('@services/TuyaService');

function gerarIdUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function* addHomeWorker(action: PlacesManagerAction) {
  try {
    if (!action.payload?.homeName) return;

    const homeName = action.payload.homeName;

    // 1️⃣ Create home in Tuya (fire-and-forget)
    yield call(function* () {
      try {
        yield call(
          TuyaService.createHome,
          homeName,          // name
          homeName+" geo",          // geoName (hardcoded)
          [],                // rooms (empty for now)
          0,                 // lat (ignored)
          0                  // lng (ignored)
        );
      } catch (e) {
        console.warn('Tuya createHome failed, ignoring:', e);
      }
    });
    // todo tuya create home here
    //  change method here to cal tuya api, ignore the attributes that they dont have it
    const custonHomeResponse: IHome = {
      name: homeName,
      createdAt: new Date().toISOString(),
      homeId: gerarIdUUID(),
      rooms: [],
    };

    const currentData: IPlacesManagerData = yield select(
      placesManagerSelectors.getData,
    );

    const updatedData: IPlacesManagerData = {
      ...currentData,
      homes: [...currentData.homes, custonHomeResponse],
    };

    yield put(placesManagerActions.setData(updatedData));

    yield call(nav.resetToApp, AppRoute.PlacesManagerTabStack, {
      screen: AppRoute.HouseList,
    });

    yield put(
      modalActions.showModal({
        title: 'Casa cadastrada!',
        subtitle: 'Você quer aproveitar e cadastrar um novo cômodo?',
        type: EModalType.FULLSCREEN,
        closeButton: true,
      }),
    );
  } catch (e) {
    yield put(
      errorScreenActions.showErrorScreen({
        title: 'Erro',
        description: 'Erro ao salvar a casa',
        primaryButton: {
          label: 'Tentar novamente',
          actionType: ECallToActionActionType.GO_BACK,
        },
      }),
    );
  }
}

function* updateHomeWorker(action: PlacesManagerAction) {
  if (!action.payload?.home) return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.home!.homeId
        ? { ...home, ...action.payload!.home }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));

  nav.to(AppRoute.PlacesManagerTabStack, {
    screen: AppRoute.HouseList,
  });
}

function* deleteHomeWorker(action: PlacesManagerAction) {
  if (!action.payload?.homeId) return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.filter(
      home => home.homeId !== action.payload!.homeId,
    ),
    selectedHome:
      currentData.selectedHome?.homeId === action.payload.homeId
        ? undefined
        : currentData.selectedHome,
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* addRoomWorker(action: PlacesManagerAction) {
  if (!action.payload?.room || !action.payload?.homeId) return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.homeId
        ? { ...home, rooms: [...home.rooms, action.payload!.room!] }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* updateRoomWorker(action: PlacesManagerAction) {
  if (!action.payload?.room || !action.payload?.homeId) return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.homeId
        ? {
            ...home,
            rooms: home.rooms.map(room =>
              room.roomId === action.payload!.room!.roomId
                ? { ...room, ...action.payload!.room }
                : room,
            ),
          }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* deleteRoomWorker(action: PlacesManagerAction) {
  if (!action.payload?.roomId || !action.payload?.homeId) return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.homeId
        ? {
            ...home,
            rooms: home.rooms.filter(
              room => room.roomId !== action.payload!.roomId,
            ),
          }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* addDeviceWorker(action: PlacesManagerAction) {
  if (
    !action.payload?.device ||
    !action.payload?.roomId ||
    !action.payload?.homeId
  )
    return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.homeId
        ? {
            ...home,
            rooms: home.rooms.map(room =>
              room.roomId === action.payload!.roomId
                ? {
                    ...room,
                    devices: [...room.devices, action.payload!.device!],
                  }
                : room,
            ),
          }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* updateDeviceWorker(action: PlacesManagerAction) {
  if (
    !action.payload?.device ||
    !action.payload?.roomId ||
    !action.payload?.homeId
  )
    return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.homeId
        ? {
            ...home,
            rooms: home.rooms.map(room =>
              room.roomId === action.payload!.roomId
                ? {
                    ...room,
                    devices: room.devices.map(device =>
                      device.id === action.payload!.device!.id
                        ? { ...device, ...action.payload!.device }
                        : device,
                    ),
                  }
                : room,
            ),
          }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* deleteDeviceWorker(action: PlacesManagerAction) {
  if (
    !action.payload?.deviceId ||
    !action.payload?.roomId ||
    !action.payload?.homeId
  )
    return;

  const currentData: IPlacesManagerData = yield select(
    placesManagerSelectors.getData,
  );

  const updatedData: IPlacesManagerData = {
    ...currentData,
    homes: currentData.homes.map(home =>
      home.homeId === action.payload!.homeId
        ? {
            ...home,
            rooms: home.rooms.map(room =>
              room.roomId === action.payload!.roomId
                ? {
                    ...room,
                    devices: room.devices.filter(
                      device => device.id !== action.payload!.deviceId,
                    ),
                  }
                : room,
            ),
          }
        : home,
    ),
  };

  yield put(placesManagerActions.setData(updatedData));
}

function* navigateToHouseManagement() {
  // todo tuya aqui
  // todo fazer chamada
  const allhomesData: IHome[] = yield select(
    placesManagerSelectors.getAllHomes,
  );

  if (allhomesData.length) {
    nav.to(AppRoute.PlacesManagerTabStack, {
      screen: AppRoute.HouseList,
    });
  } else {
    nav.to(AppRoute.PlacesManagerTabStack, {
      screen: AppRoute.HouseManagement,
    });
  }
}

export default [
  takeLatest(EPlacesManagerActionTypes.ADD_HOME_REQUEST, addHomeWorker),
  takeLatest(EPlacesManagerActionTypes.UPDATE_HOME_REQUEST, updateHomeWorker),
  takeLatest(EPlacesManagerActionTypes.DELETE_HOME_REQUEST, deleteHomeWorker),
  takeLatest(EPlacesManagerActionTypes.ADD_ROOM_REQUEST, addRoomWorker),
  takeLatest(EPlacesManagerActionTypes.UPDATE_ROOM_REQUEST, updateRoomWorker),
  takeLatest(EPlacesManagerActionTypes.DELETE_ROOM_REQUEST, deleteRoomWorker),
  takeLatest(EPlacesManagerActionTypes.ADD_DEVICE_REQUEST, addDeviceWorker),
  takeLatest(
    EPlacesManagerActionTypes.UPDATE_DEVICE_REQUEST,
    updateDeviceWorker,
  ),
  takeLatest(
    EPlacesManagerActionTypes.DELETE_DEVICE_REQUEST,
    deleteDeviceWorker,
  ),
  takeLatest(
    EPlacesManagerActionTypes.NAVIGATE_TO_HOUSE_MANAGEMENT,
    navigateToHouseManagement,
  ),
];
