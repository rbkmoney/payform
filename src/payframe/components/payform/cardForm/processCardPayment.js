import createPaymentToolToken from '../../../backend-communication/createPaymentToolToken';
import createPayment from '../../../backend-communication/createPayment';
import pollEvents from '../../../backend-communication/eventPoller/pollEvents';

/**
 * @return {CardData} cardData
 */
function propsToCardData(props) {
    const cardSet = props.viewData.cardForm.cardSet;
    return {
        cardHolder: cardSet.cardHolder.value,
        cardNumber: cardSet.cardNumber.value,
        cardExpire: cardSet.cardExpire.value,
        cardCvv: cardSet.cardCvv.value
    };
}

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
        contactInfo: {
            email: props.viewData.cardForm.email.value
        },
        paymentToolToken: payload.token,
        paymentSession: payload.session
    };
}

/**
 * @param {Object} props - CardForm component props
 * @return {Promise<EventPollingResult>} eventPollingResult
 */
function processCardPayment(props) {
    const capiEndpoint = props.appConfig.capiEndpoint;
    const accessToken = props.integration.invoiceAccessToken;
    const invoiceID = props.integration.invoice.id;
    return createPaymentToolToken({
        capiEndpoint,
        accessToken,
        cardData: propsToCardData(props)
    }).then((payload) => createPayment({
        capiEndpoint,
        accessToken,
        invoiceID,
        paymentParams: propsToPaymentParams(props, payload)
    }).then(() => pollEvents({
        capiEndpoint,
        accessToken,
        invoiceID
    })));
}

export default processCardPayment;
