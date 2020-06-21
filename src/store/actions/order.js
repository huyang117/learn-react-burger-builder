// action creators for order placing
import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseInit = () => { // mark the start of a new purchase, because when purchase is done --> purchased set to true and cause redirect to home
    return { type: actionTypes.PURCHASE_INIT };
};

export const purchaseBurgerStart = () => { // click the PLACE ORDER button
    return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerAsync = (orderData) => {
    return function (dispatch) {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            });
    };
}