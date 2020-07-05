import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err
    };
};

export const authAsync = (email, password, signUpMode) => {
    return {
        type: actionTypes.AUTH_ASYNC,
        email: email,
        password: password,
        signUpMode: signUpMode
    };
};

export const checkAuthTimeup = (expiresIn) => {
    return {
        type: actionTypes.CHECK_AUTH_TIMEUP,
        expiresInSeconds: expiresIn
    };
};

export const authLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationTime');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const authLogoutExecute = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthStateForAutoAuth = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATE_FOR_AUTO_AUTH
    };
};