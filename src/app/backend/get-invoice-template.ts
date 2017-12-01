import { InvoiceTemplate, fetchCapi } from '.';

export function getInvoiceTemplateByID(capiEndpoint: string, accessToken: string, invoiceTemplateID: string): Promise<InvoiceTemplate> {
    return fetchCapi({
        endpoint: `${capiEndpoint}/v2/processing/invoice-templates/${invoiceTemplateID}`,
        accessToken
    });
}
