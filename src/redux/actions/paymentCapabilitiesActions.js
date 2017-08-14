import { SET_APPLE_PAY_CAPABILITY } from '../constants/paymentCapabilities';
import checkCapability from '../../payframe/apple-pay/checkCapability';

function setApplePayCapability(applePayMerchantID, testFlag) {
    return (dispatch) => {
        checkCapability(applePayMerchantID, testFlag).then((capability) => {
            dispatch({
                type: SET_APPLE_PAY_CAPABILITY,
                payload: capability
            });
        });
    };
}

export { setApplePayCapability };
