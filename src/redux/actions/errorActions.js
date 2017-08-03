import { SET_ERROR } from '../constants/error';

export function setError(message) {
    return {
        type: SET_ERROR,
        payload: { message }
    };
}