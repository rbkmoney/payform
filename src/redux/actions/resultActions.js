import { SET_RESULT } from '../constants/result';

export function setClose() {
    return (dispatch) => {
        dispatch({
            type: SET_RESULT,
            payload: 'close'
        });
    }
}

export function setDone() {
    return (dispatch) => {
        dispatch({
            type: SET_RESULT,
            payload: 'done'
        });
    }
}
