import pollEvents from '../../backendCommunication/eventPoller/pollEvents';

/**
 * @param {Object} props - CardPayment component props
 */
function handleInteraction(props) {
    pollEvents({
        capiEndpoint: props.appConfig.capiEndpoint,
        accessToken: props.initParams.invoiceAccessToken,
        invoiceID: props.integration.invoice.id
    }).then((event) => {
        if (event.type === 'interact') {
            props.actions.paymentActions.interactPayment(event.data);
            props.actions.viewDataActions.updateContainerSize('large');
        }
    });
}

export default handleInteraction;
