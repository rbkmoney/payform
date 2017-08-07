import { CREATE_PAYMENT, FAILED_PAYMENT } from '../constants/process';

export default function (state = null, action) {
    switch (action.type) {
        case CREATE_PAYMENT:
        case FAILED_PAYMENT:
            return action.payload
    }
    return state;
}