import { InvoiceTemplate, fetchCapi } from '.';
import v from './capi-version';

export const getInvoiceTemplateByID = (capiEndpoint: string, accessToken: string, invoiceTemplateID: string): Promise<InvoiceTemplate> =>
    fetchCapi({
        endpoint: `${capiEndpoint}/${v}/processing/invoice-templates/${invoiceTemplateID}`,
        accessToken
    });
