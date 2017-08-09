import {
    SET_INTERACTION_DATA,
    SET_PAYMENT_ERROR,
    SET_STATUS,
    SET_TOKEN
} from '../constants/payment';

function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status
    };
}

function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token
    };
}

function setInteractionData(data) {
    return {
        type: SET_INTERACTION_DATA,
        payload: data
    };
}

function setPaymentError(error) {
    return {
        type: SET_PAYMENT_ERROR,
        payload: error
    }
}

export { setStatus, setToken, setInteractionData, setPaymentError};
