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
                payload: convert(capabilities)
            });
        });
    }
}


function toBankCard() {
    return [{
        name: 'Card',
        form: 'cardForm',
        method: 'BankCard'
    }];
}

function toTerminals(method) {
    return method.providers.map((provider) => {
        switch (provider) {
            case 'euroset':
                return {
                    name: 'Euroset',
                    form: 'eurosetForm',
                    method: 'PaymentTerminal'
                };
            default:
                break;
        }
    });
}

function convert(capabilities) {
     return capabilities.reduce((acc, current) => {
        switch (current.method) {
            case 'BankCard':
                return acc.concat(toBankCard(current));
            case 'PaymentTerminal':
                return acc.concat(toTerminals(current));
            default:
                break;
        }
    }, []);
}

function setTemplatePaymentCapabilities() {
    return (dispatch) => {
        dispatch({
            type: SET_PAYMENT_CAPABILITIES,
            payload: convert([
                {method: 'BankCard', paymentSystems: ['visa']},
                {method: 'PaymentTerminal', providers: ['euroset']}
            ])
        });
    }
}

export { setApplePayCapability, setPaymentCapabilities, setTemplatePaymentCapabilities };
