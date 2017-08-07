import { SET_STATUS } from '../constants/status';

export function setStatus(status) {
    return (dispatch) => {
        dispatch({
            type: SET_STATUS,
            payload: status
        });
    }
}