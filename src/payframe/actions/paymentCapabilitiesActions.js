import { SET_APPLE_PAY_CAPABILITY, SET_PAYMENT_CAPABILITIES } from '../constants/paymentCapabilities';
import checkCapability from '../applePay/checkCapability';
import getInvoicePaymentMethods from '../backendCommunication/getInvoicePaymentMethods';
import getInvoiceTemplatePaymentMethods from '../backendCommunication/getInvoiceTemplatePaymentMethods';

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

function setPaymentCapabilities(props) {
    return (dispatch) => {
        getInvoicePaymentMethods({
            capiEndpoint: props.appConfig.capiEndpoint,
            invoiceID: props.initParams.invoiceID,
            accessToken: props.initParams.invoiceAccessToken
        }).then((capabilities) => {
            dispatch({
                type: SET_PAYMENT_CAPABILITIES,
                payload: convert(capabilities)
            });
        });
    }
}

function toTerminals(method) {
    return [{
        name: 'terminal',
        methods: method.providers
    }];
}

function convert(capabilities) {
     return capabilities.reduce((acc, current) => {
        switch (current.method) {
            case 'BankCard':
                return acc;
            case 'PaymentTerminal':
                return acc.concat(toTerminals(current));
            default:
                break;
        }
    }, []);
}

function setTemplatePaymentCapabilities(props) {
    return (dispatch) => {
        getInvoiceTemplatePaymentMethods({
            capiEndpoint: props.appConfig.capiEndpoint,
            invoiceTemplateID: props.initParams.invoiceTemplateID,
            accessToken: props.initParams.invoiceTemplateAccessToken
        }).then((capabilities) => {
            dispatch({
                type: SET_PAYMENT_CAPABILITIES,
                payload: convert(capabilities)
            });
        });
    }
}

export { setApplePayCapability, setPaymentCapabilities, setTemplatePaymentCapabilities };
