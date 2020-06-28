import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    const state1 = undefined;
    const action1 = {};
    const expectedResult1 = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    };

    const state2 = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    };
    const action2 = {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'test-token',
        userId: 'test-id'
    };
    const expectedResult2 = {
        token: 'test-token',
        userId: 'test-id',
        error: null,
        loading: false,
        authRedirectPath: '/'
    };

    it('should return initial state', () => {
        expect(reducer(state1, action1)).toEqual(expectedResult1);
    });

    it('should store token and userId upon authentication success', () => {
        expect(reducer(state2, action2)).toEqual(expectedResult2);
    });
});