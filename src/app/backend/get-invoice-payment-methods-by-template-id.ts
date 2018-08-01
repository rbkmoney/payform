import { PaymentMethod, fetchCapi } from '.';
import v from './capi-version';

export const getInvoicePaymentMethodsByTemplateID = (
    capiEndpoint: string,
    accessToken: string,
    invoiceTemplateID: string
): Promise<PaymentMethod[]> =>
    fetchCapi({
        endpoint: `${capiEndpoint}/${v}/processing/invoice-templates/${invoiceTemplateID}/payment-methods`,
        accessToken
    });
