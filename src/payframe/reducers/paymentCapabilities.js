import { SET_APPLE_PAY_CAPABILITY, SET_PAYMENT_CAPABILITIES } from '../constants/paymentCapabilities';

/**
 * @field applePay {'unknown','capable','unavailable'}
 * @filed capabilities
 */
const defaultState = {
    capabilities: [
        {
            name: 'card',
            methods: ['bankCard']
        }
    ]
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SET_APPLE_PAY_CAPABILITY: {
            const capabilities = state.capabilities;
            if (action.payload === 'unavailable') {
                capabilities[capabilities.findIndex((item) => item.name === 'card')].methods.push('applePay');
            }
            return {
                ...state,
                capabilities
            };
        }
        case SET_PAYMENT_CAPABILITIES:
            return {
                ...state,
                capabilities: state.capabilities.concat(action.payload)
            };
    }
    return state;
}
