// reducer for order placing
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    orderSubmitLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                orderSubmitLoading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                orderSubmitLoading: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                orderSubmitLoading: false
            };
        default:
            return state;
    }
}

export default reducer;

