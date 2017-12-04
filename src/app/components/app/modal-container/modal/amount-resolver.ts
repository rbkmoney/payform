import { format, findCurrency } from 'currency-formatter';
import { IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import {
    Invoice,
    InvoiceTemplate,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine
} from 'checkout/backend';

const getAmountFromSingleLine = (details: InvoiceTemplateSingleLine): Amount | null => {
    let result = null;
    const price = details.price;
    if (price && price.costType === 'InvoiceTemplateLineCostFixed') {
        const fixed = price as InvoiceTemplateLineCostFixed;
        result = {
            value: fixed.amount,
            currencyCode: fixed.currency
        };
    }
    return result;
};

const getAmountFromMultiLine = (details: InvoiceTemplateMultiLine): Amount => ({
    value: details.cart.reduce((p, c) => p + (c.price * c.quantity), 0),
    currencyCode: details.currency
});

const getAmountFromInvoiceTemplate = (invoiceTemplate: InvoiceTemplate): Amount => {
    switch (invoiceTemplate.details.templateType) {
        case 'InvoiceTemplateSingleLine':
            return getAmountFromSingleLine(invoiceTemplate.details as InvoiceTemplateSingleLine);
        case 'InvoiceTemplateMultiLine':
            return getAmountFromMultiLine(invoiceTemplate.details as InvoiceTemplateMultiLine);
    }
};

const getAmountFromInvoice = (invoice: Invoice) => ({
    value: invoice.amount,
    currencyCode: invoice.currency
});

export interface Amount {
    value: number;
    currencyCode: string;
}

export const getAmount = (integrationType: IntegrationType, m: ModelState): Amount | null => {
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
            return getAmountFromInvoiceTemplate(m.invoiceTemplate);
        case IntegrationType.invoice:
            return getAmountFromInvoice(m.invoice);
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};

export interface FormattedAmount {
    value: string;
    symbol: string;
}

export const formatAmount = (amount: Amount): FormattedAmount | null => (amount ? {
    value: format(amount.value / 100, {decimal: ', ', thousand: ' '}),
    symbol: findCurrency(amount.currencyCode).symbol
} : null);
