import { SET_STATUS } from '../constants/payment';

function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: {
            status
        }
    };
}

export { setStatus };
