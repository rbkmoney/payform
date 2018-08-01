import { CustomerEvent, fetchCapi } from 'checkout/backend';
import v from 'checkout/backend/capi-version';

export const getCustomerEvents = (
    capiEndpoint: string,
    accessToken: string,
    customerID: string,
    limit: number = 50,
    eventID?: number
): Promise<CustomerEvent[]> => {
    let endpoint = `${capiEndpoint}/${v}/processing/customers/${customerID}/events?limit=${limit}`;
    endpoint = eventID ? endpoint + `&eventID=${eventID}` : endpoint;
    return fetchCapi({ endpoint, accessToken });
};
