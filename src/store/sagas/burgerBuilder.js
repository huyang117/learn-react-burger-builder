import { put } from 'redux-saga/effects';

import * as actionsIndex from '../actions/actionsIndex';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://react-my-burger-8941b.firebaseio.com/ingredients.json');
        yield put(actionsIndex.setIngredients(response.data));
    } catch (error) {
        yield put(actionsIndex.fetchIngredientsFailed());
    }
};