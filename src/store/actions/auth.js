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
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeup(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFailed(err.response.data.error));
            });
    };
};

export const checkAuthTimeup = (expiresIn) => {
    return function(dispatch) {
        setTimeout(()=> {
            dispatch(authLogout());
        }, expiresIn * 1000);
    };
};

export const authLogout = () => {
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