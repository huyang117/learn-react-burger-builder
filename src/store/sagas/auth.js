import * as actionsIndex from '../actions/actionsIndex';

import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';

export function* authLogoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');
    yield put(actionsIndex.authLogoutExecute());
}

export function* checkAuthTimeupSaga(action) {
    yield delay(action.expiresInSeconds * 1000);
    yield put(actionsIndex.authLogout());
}