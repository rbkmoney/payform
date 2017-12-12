import { PaymentParams, Payment } from './model';
import v from './capi-version';
import { fetchCapi } from './fetch-capi';

export const createPayment = (capiEndpoint: string, accessToken: string, invoiceID: string, paymentParams: PaymentParams): Promise<Payment> =>
    fetchCapi({
        endpoint: `${capiEndpoint}/${v}/processing/invoices/${invoiceID}/payments`,
        accessToken,
        body: paymentParams
    });
