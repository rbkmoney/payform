import { fetchCapi } from '.';
import v from './capi-version';
import { InvoiceEvent } from 'checkout/backend/model';

export const getInvoiceEvents = (
    capiEndpoint: string,
    accessToken: string,
    invoiceID: string,
    limit: number = 50,
    eventID?: number
): Promise<InvoiceEvent[]> => {
    let endpoint = `${capiEndpoint}/${v}/processing/invoices/${invoiceID}/events?limit=${limit}`;
    endpoint = eventID ? endpoint + `&eventID=${eventID}` : endpoint;
    return fetchCapi({ endpoint, accessToken });
};
