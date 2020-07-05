import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actionsIndex from '../actions/actionsIndex';

export function* purchaseBurgerAsyncSaga(action) {
    yield put(actionsIndex.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actionsIndex.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actionsIndex.purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersAsyncSaga(action) {
    yield put(actionsIndex.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const ordersFetched = [];
        for (let key in response.data) {
            ordersFetched.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actionsIndex.fetchOrdersSuccess(ordersFetched));
    } catch (error) {
        yield put(actionsIndex.fetchOrdersFailed(error));
    }
}

