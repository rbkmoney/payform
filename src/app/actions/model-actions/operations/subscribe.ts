import { CardFormValues, ConfigState, ModelState } from 'checkout/state';
import { createPaymentResourceCardData } from './create-payment-resource';
import { CustomerInitConfig } from 'checkout/config';
import { createBinding, CustomerEvent } from 'checkout/backend';
import { pollCustomerEvents } from './poll-events';

export const subscribe = (c: ConfigState, m: ModelState, v: CardFormValues): Promise<CustomerEvent[]> => {
    const endpoint = c.appConfig.capiEndpoint;
    const customerConfig = c.initConfig as CustomerInitConfig;
    const accessToken = customerConfig.customerAccessToken;
    const customerID = customerConfig.customerID;
    return createPaymentResourceCardData(endpoint, accessToken, v).then((paymentResource) =>
        createBinding(endpoint, accessToken, customerID, paymentResource)).then(() =>
        pollCustomerEvents(endpoint, accessToken, customerID, m.customerEvents));
};
