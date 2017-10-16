import pollEvents from '../backendCommunication/eventPoller/pollEvents';

/**
 * @param {Object} props - Modal component props
 */
function handleInteraction(props) {
    pollEvents({
        capiEndpoint: props.appConfig.capiEndpoint,
        accessToken: props.initParams.invoiceAccessToken,
        invoiceID: props.integration.invoice.id
    }).then((event) => {
        if (event.type === 'interact') {
            switch (event.data.interactionType) {
                case 'PaymentTerminalReceipt':
                    props.actions.viewDataActions.setActiveForm('eurosetForm');
                    props.actions.paymentActions.interactTerminalPayment(event.data);
                    break;
                case 'Redirect':
                    props.actions.viewDataActions.setActiveForm('cardForm');
                    props.actions.paymentActions.interactPayment(event.data.request);
                    props.actions.viewDataActions.updateContainerSize('large');
                    break;
                default:
                    break;
            }
        }
        if (event.type === 'processed') {
            props.actions.errorActions.setError({
                localePath: 'error.payment.processed'
            });
        }
    });
}

export default handleInteraction;
