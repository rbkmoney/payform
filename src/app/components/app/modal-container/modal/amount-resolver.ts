import { ModelState } from 'checkout/state';
import {
    CostType,
    InvoiceChangeType,
    InvoiceCreated,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { Amount, findChange } from 'checkout/utils';

const getAmountFromSingleLine = (model: ModelState, configAmount: number | null): Amount | null => {
    const details = model.invoiceTemplate.details as InvoiceTemplateSingleLine;
    const price = details.price;
    if (!price) {
        return null;
    }
    switch (price.costType) {
        case CostType.InvoiceTemplateLineCostFixed:
            const fixed = price as InvoiceTemplateLineCostFixed;
            return {
                value: fixed.amount,
                currencyCode: fixed.currency
            };
        case CostType.InvoiceTemplateLineCostRange:
            return configAmount ? {
                value: configAmount,
                currencyCode: (price as InvoiceTemplateLineCostRange).currency
            } : null;
        case CostType.InvoiceTemplateLineCostUnlim:
            return configAmount ? {
                value: configAmount,
                currencyCode: 'RUB' // TODO unlim cost type does't support currency
            } : null;
    }
};

const getAmountFromMultiLine = (details: InvoiceTemplateMultiLine): Amount => ({
    value: details.cart.reduce((p, c) => p + (c.price * c.quantity), 0),
    currencyCode: details.currency
});

const getAmountFromInvoiceTemplate = (model: ModelState, configAmount: number | null): Amount => {
    switch (model.invoiceTemplate.details.templateType) {
        case 'InvoiceTemplateSingleLine':
            return getAmountFromSingleLine(model, configAmount);
        case 'InvoiceTemplateMultiLine':
            return getAmountFromMultiLine(model.invoiceTemplate.details as InvoiceTemplateMultiLine);
    }
};

const getAmountFromInvoice = (invoiceCreated: InvoiceCreated): Amount => {
    const {invoice: {amount, currency}} = invoiceCreated;
    return {
        value: amount,
        currencyCode: currency
    };
};

export const getAmount = (m: ModelState, configAmount: number | null): Amount | null => {
    if (!m.invoiceEvents && !m.invoiceTemplate) {
        return;
    }
    const invoiceCreated = findChange(m.invoiceEvents, InvoiceChangeType.InvoiceCreated);
    return invoiceCreated
        ? getAmountFromInvoice(invoiceCreated as InvoiceCreated)
        : getAmountFromInvoiceTemplate(m, configAmount);
};
