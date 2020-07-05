import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { authLogoutSaga, checkAuthTimeupSaga, authAsyncSaga } from './auth';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEUP, checkAuthTimeupSaga);
    yield takeEvery(actionTypes.AUTH_ASYNC, authAsyncSaga);
}