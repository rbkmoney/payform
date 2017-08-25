import createPaymentToolToken from '../../../backend-communication/createPaymentToolToken';
import createPayment from '../../../backend-communication/createPayment';
import EventPoller from '../../../backend-communication/EventPoller';

/**
 * @return {CardData}
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
 * @return {PaymentParamsFlow}
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
 * @return {PaymentParams}
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
 * @return {Object}
 */
function processCardPayment(props) {
    const capiEndpoint = props.appConfig.capiEndpoint;
    const accessToken = props.payment.accessToken;
    const invoiceID = props.integration.invoice.id;
    return createPaymentToolToken({
        capiEndpoint,
        accessToken,
        cardData: propsToCardData(props)
    }).then((payload) => createPayment({
        capiEndpoint,
        invoiceID,
        accessToken,
        paymentParams: propsToPaymentParams(props, payload)
    }).then(() => EventPoller.pollEvents(capiEndpoint, invoiceID, accessToken)));
}

export default processCardPayment;
