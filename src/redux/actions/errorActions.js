import { SET_ERROR } from '../constants/error';

export function setError(error) {
    return {
        type: SET_ERROR,
        payload: {
            localePath: error.localePath,
            message: error.message
        }
    };
}