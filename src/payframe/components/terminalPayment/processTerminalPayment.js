import createPaymentToolToken from '../../backendCommunication/createPaymentToolToken';
import createPayment from '../../backendCommunication/createPayment';
import pollEvents from '../../backendCommunication/eventPoller/pollEvents';

function propsToPaymentTool() {
    return {
        type: 'PaymentTerminalData',
        provider: 'euroset'
    };
}

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

function processTerminalPayment(props) {
    const capiEndpoint = props.appConfig.capiEndpoint;
    const accessToken = props.integration.invoiceAccessToken;
    const invoiceID = props.integration.invoice.id;
    return createPaymentToolToken({
        capiEndpoint,
        accessToken,
        paymentTool: propsToPaymentTool(props)
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

export default processTerminalPayment;