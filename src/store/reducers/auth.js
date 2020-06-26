import * as actionTypes from '../actions/actionTypes';
import { updateStateUtil } from '../../shared/utility';

const errorCodeMap = {
    'EMAIL_EXISTS': 'The email address is already in use by another account',
    'OPERATION_NOT_ALLOWED': 'Password sign-in is disabled for this project',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'We have blocked all requests from this device due to unusual activity. Try again later',
    'EMAIL_NOT_FOUND': 'There is no user record corresponding to this identifier. The user may have been deleted',
    'INVALID_PASSWORD': 'The password is invalid or the user does not have a password',
    'USER_DISABLED': 'The user account has been disabled by an administrator'
};

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
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
    let errorMessage = errorCodeMap[action.error.message] ? errorCodeMap[action.error.message]: action.error.message; 
    return updateStateUtil(state, {
        error: errorMessage,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateStateUtil(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateStateUtil(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: 
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default: 
            return state; 
    }
};

export default reducer;