import { SET_APPLE_PAY_CAPABILITY, SET_PAYMENT_CAPABILITIES } from '../constants/paymentCapabilities';

/**
 * @field applePay {'unknown','capable','unavailable'}
 * @filed capabilities
 */
const defaultState = {
    applePay: 'unknown',
    capabilities: []
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SET_APPLE_PAY_CAPABILITY:
            return {
                ...state,
                applePay: action.payload
            };
        case SET_PAYMENT_CAPABILITIES:
            return {
                ...state,
                capabilities: action.payload
            };
    }
    return state;
}
