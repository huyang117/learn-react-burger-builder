import * as actionTypes from '../actions/actionTypes';
import { updateStateUtil } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateStateUtil(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateStateUtil(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFailed = (state, action) => {
    return updateStateUtil(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: 
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);
        default: 
            return state; 
    }
};

export default reducer;