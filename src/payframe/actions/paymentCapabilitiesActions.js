import { SET_APPLE_PAY_CAPABILITY, SET_PAYMENT_CAPABILITIES } from '../constants/paymentCapabilities';
import checkCapability from '../applePay/checkCapability';
import getInvoicePaymentMethods from '../backendCommunication/getInvoicePaymentMethods';

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

function setPaymentCapabilities(params) {
    return (dispatch) => {
        getInvoicePaymentMethods(params).then((capabilities) => {
            dispatch({
                type: SET_PAYMENT_CAPABILITIES,
                payload: capabilities
            });
        });
    }
}

export { setApplePayCapability, setPaymentCapabilities };
