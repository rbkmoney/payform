import createPaymentToolToken from '../../../backendCommunication/createPaymentToolToken';
import createPayment from '../../../backendCommunication/createPayment';
import pollEvents from '../../../backendCommunication/eventPoller/pollEvents';

/**
 * @return {PaymentParamsFlow} paymentParamsFlow
 */
function getPaymentFlow(initParams) {
    let result = {
        type: 'PaymentFlowInstant'
    };
    if (initParams.paymentFlowHold) {
        result = {
            type: 'PaymentFlowHold',
            onHoldExpiration: initParams.holdExpiration
                ? initParams.holdExpiration
                : 'cancel'
        };
    }
    return result;
}

/**
 * @return {PaymentParams} paymentParams
 */
function propsToPaymentParams(props, payload) {
    return {
        flow: getPaymentFlow(props.initParams),
        payer: {
            payerType: 'PaymentResourcePayer',
            paymentToolToken: payload.paymentToolToken,
            paymentSession: payload.paymentSession,
            contactInfo: {
                email: props.viewData.cardForm.email.value
            },
        }
    };
}

/**
 * @param {Object} props - ApplePayForm component props
 * @return {Promise<EventPollingResult>} eventPollingResult
 */
function processApplePayPayment(props) {
    const capiEndpoint = props.appConfig.capiEndpoint;
    // TODO fix after real apple pay payments api capability
    switch (props.integration.type) {
        case 'default':
        case 'template': {
            const invoiceAccessToken = props.integration.invoiceAccessToken;
            const invoiceID = props.integration.invoice.id;
            return createPaymentToolToken({
                capiEndpoint,
                invoiceAccessToken,
                cardData: {
                    cardHolder: 'APPLE PAY PAYER',
                    cardNumber: '4242424242424242',
                    cardExpire: '12/20',
                    cardCvv: '123'
                }
            }).then((payload) => createPayment({
                capiEndpoint,
                accessToken: invoiceAccessToken,
                invoiceID,
                paymentParams: propsToPaymentParams(props, payload)
            }).then(() => pollEvents({
                capiEndpoint,
                invoiceAccessToken,
                invoiceID
            })));
        }
    }
}

export default processApplePayPayment;
