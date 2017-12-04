import { Invoice, fetchCapi } from '.';
import v from './capi-version';

export const getInvoiceByID = (capiEndpoint: string, accessToken: string, invoiceID: string): Promise<Invoice> =>
    fetchCapi({
        endpoint: `${capiEndpoint}/${v}/processing/invoices/${invoiceID}`,
        accessToken
    });
