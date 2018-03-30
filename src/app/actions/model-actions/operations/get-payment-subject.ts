import toNumber from 'lodash-es/toNumber';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { ConfigState, ModelState } from 'checkout/state';
import { createInvoiceWithTemplate } from 'checkout/backend';
import { PaymentSubject } from './payment-subject';
import { Amount, resolveAmount } from 'checkout/utils';

const infoToAmount = (amountInfo: Amount, formAmount: string): number =>
    formAmount ? toNumber(formAmount) * 100 : amountInfo.value;

const resolveInvoiceTemplate = (c: ConfigState, m: ModelState, formAmount: string): Promise<PaymentSubject> => {
    const endpoint = c.appConfig.capiEndpoint;
    const amountInfo = resolveAmount(m, c.initConfig.amount);
    const amount = infoToAmount(amountInfo, formAmount);
    const metadata = m.invoiceTemplate.metadata;
    const params = {amount, metadata, currency: amountInfo.currencyCode};
    const {invoiceTemplateAccessToken, invoiceTemplateID} = c.initConfig as InvoiceTemplateInitConfig;
    return createInvoiceWithTemplate(endpoint, invoiceTemplateAccessToken, invoiceTemplateID, params)
        .then((invoiceAndToken) => ({
            integrationType: IntegrationType.invoiceTemplate,
            invoiceID: invoiceAndToken.invoice.id,
            accessToken: invoiceAndToken.invoiceAccessToken.payload
        }));
};

const resolveInvoice = (c: InvoiceInitConfig): Promise<PaymentSubject> =>
    Promise.resolve({
        integrationType: IntegrationType.invoice,
        invoiceID: c.invoiceID,
        accessToken: c.invoiceAccessToken
    });

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
