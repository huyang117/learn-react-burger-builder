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
    return function(dispatch) {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3iyefgBrItcLpiTxVO0Ve5-6LqPLNx8w';
        if (! signUpMode) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3iyefgBrItcLpiTxVO0Ve5-6LqPLNx8w';
        }
        axios.post(url,authData)
            .then(response => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeup(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error));
            });
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
    return function (dispatch) {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (new Date() > expirationTime) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkAuthTimeup((expirationTime.getTime()-new Date().getTime())/1000));
            }
        }
    };
};