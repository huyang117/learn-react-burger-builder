// reducer for order placing
import * as actionTypes from '../actions/actionTypes';
import { updateStateUtil } from '../utility';

const initialState = {
    orders: [],
    orderSubmitLoading: false,
    fetchOrderLoading: true,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateStateUtil(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateStateUtil(state, { orderSubmitLoading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateStateUtil(action.orderData, { id: action.orderId });
            return updateStateUtil(state, {
                orders: state.orders.concat(newOrder),
                orderSubmitLoading: false,
                purchased: true
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateStateUtil(state, { orderSubmitLoading: false });
        case actionTypes.FETCH_ORDERS_START:
            return updateStateUtil(state, { fetchOrderLoading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateStateUtil(state, {
                orders: action.orders,
                fetchOrderLoading: false
            });
        case actionTypes.FETCH_ORDERS_FAILED:
            return updateStateUtil(state, { fetchOrderLoading: false }); 
        default:
            return state;
    }
}

export default reducer;

