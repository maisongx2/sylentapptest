import { all } from 'redux-saga/effects';
import authSaga from './modules/auth/authSaga';
import weatherSaga from './modules/weather/weatherSaga';
import callToActionSaga from './modules/callToAction/callToActionSaga';
import { genericSaga } from './modules/generic/genericSagas';
import registerSaga from './modules/register/registerSaga';
import placesManagerSaga from './modules/placesManager/placesManagerSaga';

export default function* rootSaga() {
  yield all([
    ...authSaga,
    ...weatherSaga,
    ...callToActionSaga,
    ...genericSaga,
    ...registerSaga,
    ...placesManagerSaga,
  ]);
}
