import { SET_APPLE_PAY_CAPABILITY } from '../constants/paymentCapabilities';

/**
 * @field applePay {'unknown','capable','unavailable'}
 */
const defaultState = {
    applePay: 'unavaible'
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SET_APPLE_PAY_CAPABILITY:
            return {
                ...state,
                applePay: action.payload
            };
    }
    return state;
}
