import { fetchCapi } from '.';
import v from './capi-version';

export const getInvoiceEvents = (capiEndpoint: string, accessToken: string, invoiceID: string, limit: number = 30, eventID?: number): Promise<Event[]> => {
    let endpoint = `${capiEndpoint}/${v}/processing/invoices/${invoiceID}/events?limit=${limit}`;
    endpoint = eventID ? endpoint + `&eventID=${eventID}` : endpoint;
    return fetchCapi({endpoint, accessToken});
};
