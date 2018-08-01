import { PaymentMethod, fetchCapi } from '.';
import v from './capi-version';

export const getInvoicePaymentMethods = (
    capiEndpoint: string,
    accessToken: string,
    invoiceID: string
): Promise<PaymentMethod[]> =>
    fetchCapi({
        endpoint: `${capiEndpoint}/${v}/processing/invoices/${invoiceID}/payment-methods`,
        accessToken
    });
