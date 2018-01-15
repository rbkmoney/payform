import { IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import {
    ChangeType,
    Event, InvoiceCreated,
    InvoiceTemplate,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { Amount, findChange } from 'checkout/utils';

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

const getAmountFromInvoice = (events: Event[]) => {
    const {invoice} = findChange(events, ChangeType.InvoiceCreated) as InvoiceCreated;
    return {
        value: invoice.amount,
        currencyCode: invoice.currency
    };
};

export const getAmount = (integrationType: IntegrationType, m: ModelState): Amount | null => {
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
            return getAmountFromInvoiceTemplate(m.invoiceTemplate);
        case IntegrationType.invoice:
            return getAmountFromInvoice(m.invoiceEvents);
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};
