import createPaymentToolToken from '../../../backendCommunication/createPaymentToolToken';
import createPayment from '../../../backendCommunication/createPayment';
import pollEvents from '../../../backendCommunication/eventPoller/pollEvents';
import createBinding from '../../../backendCommunication/createBinding';
import pollCustomerEvents from '../../../backendCommunication/eventPoller/pollCustomerEvents';

/**
 * @return {CardData} cardData
 */
function propsToCardData(props) {
    const cardSet = props.viewData.cardForm.cardSet;
    return {
        type: 'CardData',
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
    switch (props.integration.type) {
        case 'default':
        case 'template': {
            const invoiceAccessToken = props.integration.invoiceAccessToken;
            const invoiceID = props.integration.invoice.id;
            return createPaymentToolToken({
                capiEndpoint,
                invoiceAccessToken,
                paymentTool: propsToCardData(props)
            }).then((payload) => createPayment({
                capiEndpoint,
                invoiceAccessToken,
                invoiceID,
                paymentParams: propsToPaymentParams(props, payload)
            }).then(() => pollEvents({
                capiEndpoint,
                invoiceAccessToken,
                invoiceID
            })));
        }
        case 'customer': {
            const customerAccessToken = props.integration.customerAccessToken;
            const customerID = props.integration.customer.id;
            return createPaymentToolToken({
                capiEndpoint,
                customerAccessToken,
                paymentTool: propsToCardData(props)
            }).then((payload) => createBinding({
                capiEndpoint,
                customerAccessToken,
                paymentResource: {
                    paymentToolToken: payload.token,
                    paymentSession: payload.session
                }
            }).then(() => pollCustomerEvents({
                capiEndpoint,
                customerAccessToken,
                customerID
            })));
        }

    }
}

export default processCardPayment;
