import {
    SET_INTERACTION_DATA,
    SET_PAYMENT_ERROR,
    SET_STATUS,
    SET_TOKEN
} from '../constants/payment';

/**
 * @field status {
 *     'pristine',
 *     'started',
 *     'interacted',
 *     'processTemplate',
 *     'processApplePay',
 *     'processPayment',
 *     'finished',
 *     'error'
 * }
 */
const initialState = {
    status: 'pristine'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case SET_INTERACTION_DATA:
            return {
                ...state,
                interactionData: action.payload
            };
        case SET_PAYMENT_ERROR:
            return {
                ...state,
                paymentError: action.payload
            }
    }
    return state;
}
