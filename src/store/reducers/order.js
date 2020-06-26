// reducer for order placing
import * as actionTypes from '../actions/actionTypes';
import { updateStateUtil } from '../../shared/utility';

const initialState = {
    orders: [],
    orderSubmitLoading: false,
    fetchOrderLoading: true,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateStateUtil(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateStateUtil(state, { orderSubmitLoading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateStateUtil(action.orderData, { id: action.orderId });
    return updateStateUtil(state, {
        orders: state.orders.concat(newOrder),
        orderSubmitLoading: false,
        purchased: true
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateStateUtil(state, { orderSubmitLoading: false });
};

const fetchOrdersStart = (state, action) => {
    return updateStateUtil(state, { fetchOrderLoading: true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateStateUtil(state, {
        orders: action.orders,
        fetchOrderLoading: false
    });
};

const fetchOrdersFailed = (state, action) => {
    return updateStateUtil(state, { fetchOrderLoading: false });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);
        default:
            return state;
    }
}

export default reducer;

