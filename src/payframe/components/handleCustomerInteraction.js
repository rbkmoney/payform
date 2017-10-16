import pollCustomerEvents from '../backendCommunication/eventPoller/pollCustomerEvents';

/**
 * @param {Object} props - Modal component props
 */
function handleCustomerInteraction(props) {
    pollCustomerEvents({
        capiEndpoint: props.appConfig.capiEndpoint,
        accessToken: props.initParams.customerAccessToken,
        customerID: props.integration.customer.id
    }).then((event) => {
        if (event.type === 'interact') {
            props.actions.viewDataActions.setActiveForm('cardForm');
            props.actions.paymentActions.interactPayment(event.data.request);
            props.actions.viewDataActions.updateContainerSize('large');
        }
        if (event.type === 'processed') {
            props.actions.errorActions.setError({
                localePath: 'error.payment.processed'
            });
        }
    });
}

export default handleCustomerInteraction;
