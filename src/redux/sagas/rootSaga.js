import { all } from 'redux-saga/effects';
import { userSagas } from './userSagas';
import { traineeSagas } from './traineeSagas';

export default function* rootSaga() {
  yield all([
    userSagas(),
    traineeSagas(),
  ]);
}