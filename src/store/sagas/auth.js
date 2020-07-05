import * as actionsIndex from '../actions/actionsIndex';

import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

export function* authLogoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationTime');
    yield localStorage.removeItem('userId');
    yield put(actionsIndex.authLogoutExecute());
};

export function* checkAuthTimeupSaga(action) {
    yield delay(action.expiresInSeconds * 1000);
    yield put(actionsIndex.authLogout());
};

export function* authAsyncSaga(action) {
    yield put(actionsIndex.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3iyefgBrItcLpiTxVO0Ve5-6LqPLNx8w';
    if (!action.signUpMode) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3iyefgBrItcLpiTxVO0Ve5-6LqPLNx8w';
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationTime = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationTime', expirationTime);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actionsIndex.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionsIndex.checkAuthTimeup(response.data.expiresIn));
    } catch (error) {
        yield put(actionsIndex.authFailed(error.response.data.error));
    }
};

export function* checkAuthStateForAutoAuthSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actionsIndex.authLogout());
    } else {
        const expirationTime = yield new Date(localStorage.getItem('expirationTime'));
        if (new Date() > expirationTime) {
            yield put(actionsIndex.authLogout());
        } else {
            yield put(actionsIndex.authSuccess(token, localStorage.getItem('userId')));
            yield put(actionsIndex.checkAuthTimeup((expirationTime.getTime()-new Date().getTime())/1000));
        }
    }
}