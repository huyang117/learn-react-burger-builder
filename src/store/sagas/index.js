import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { 
    authLogoutSaga, 
    checkAuthTimeupSaga, 
    authAsyncSaga, 
    checkAuthStateForAutoAuthSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEUP, checkAuthTimeupSaga);
    yield takeEvery(actionTypes.AUTH_ASYNC, authAsyncSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_STATE_FOR_AUTO_AUTH, checkAuthStateForAutoAuthSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}