import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { getAmount } from 'checkout/components/app/modal-container/modal/amount-resolver';
import { ConfigState, ModelState } from 'checkout/state';
import { toNumber } from 'lodash';
import { createInvoiceWithTemplate } from 'checkout/backend';
import { PaymentSubject } from './payment-subject';

const resolveAmount = (t: IntegrationType, m: ModelState, formAmount: string): number =>
    formAmount ? toNumber(formAmount) * 100 : getAmount(t, m).value; // TODO use amount from events

const resolveInvoiceTemplate = (c: ConfigState, m: ModelState, formAmount: string): Promise<PaymentSubject> => {
    const endpoint = c.appConfig.capiEndpoint;
    const initConfig = c.initConfig as InvoiceTemplateInitConfig;
    const amount = resolveAmount(IntegrationType.invoiceTemplate, m, formAmount);
    const metadata = m.invoiceTemplate.metadata;
    const params = {amount, metadata, currency: 'RUB'}; // TODO fix hardcoded currency
    return createInvoiceWithTemplate(endpoint, initConfig.invoiceTemplateAccessToken, initConfig.invoiceTemplateID, params)
        .then((invoiceAndToken) => ({
            integrationType: IntegrationType.invoiceTemplate,
            invoiceID: invoiceAndToken.invoice.id,
            accessToken: invoiceAndToken.invoiceAccessToken.payload
        }));
};

const resolveInvoice = (c: InvoiceInitConfig): Promise<PaymentSubject> => {
    return Promise.resolve({
        integrationType: IntegrationType.invoice,
        invoiceID: c.invoiceID,
        accessToken: c.invoiceAccessToken
    });
};

export const getPaymentSubject = (c: ConfigState, m: ModelState, formAmount: string): Promise<PaymentSubject> => {
    switch (c.initConfig.integrationType) {
        case IntegrationType.invoiceTemplate:
            return resolveInvoiceTemplate(c, m, formAmount);
        case IntegrationType.invoice:
            return resolveInvoice(c.initConfig as InvoiceInitConfig);
        case IntegrationType.customer:
            throw new Error('Unsupported integration type');
    }
};
