import axios from 'axios';

import * as actionsType from './actionsTypes';

export const authStart = () => {
    return {
        type: actionsType.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionsType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionsType.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionsType.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    const APIKEY = 'AIzaSyDJoRx5VDrEYXCMLwmMM-4U-VY3kMmSkiY'; //should be an environment variable 
    const baseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
    const authData = { email: email, password: password, returnSecureToken: true };

    return dispatch => {
        dispatch(authStart());
        let url = `${baseAuthUrl}:signUp?key=${APIKEY}`;
        if (!isSignup) {
            url = `${baseAuthUrl}:signInWithPassword?key=${APIKEY}`;
        }
        axios.post(url, authData)
            .then((res) => {
                console.log(res);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => dispatch(authFail(err)));
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionsType.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
