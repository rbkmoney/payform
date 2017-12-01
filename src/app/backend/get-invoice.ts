import { Invoice, fetchCapi } from '.';

export function getInvoiceByID(capiEndpoint: string, accessToken: string, invoiceID: string): Promise<Invoice> {
    return fetchCapi({
        endpoint: `${capiEndpoint}/v2/processing/invoices/${invoiceID}`,
        accessToken
    });
}
