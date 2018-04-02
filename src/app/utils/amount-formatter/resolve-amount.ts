import { ModelState } from 'checkout/state';
import {
    CostType,
    InvoiceChangeType,
    InvoiceCreated, InvoiceTemplate,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    TemplateType
} from 'checkout/backend';
import { Amount } from './amount';
import { findChange } from '../event-utils';

const getAmountFromSingleLine = (details: InvoiceTemplateSingleLine, configAmount: number): Amount => {
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
            return {
                value: configAmount,
                currencyCode: (price as InvoiceTemplateLineCostRange).currency
            };
        case CostType.InvoiceTemplateLineCostUnlim:
            return {
                value: configAmount,
                currencyCode: 'RUB' // TODO unlim cost type does't support currency
            };
    }
};

const getAmountFromMultiLine = (details: InvoiceTemplateMultiLine): Amount => ({
    value: details.cart.reduce((p, c) => p + (c.price * c.quantity), 0),
    currencyCode: details.currency
});

const resolveInvoiceTemplate = (invoiceTemplate: InvoiceTemplate, configAmount: number): Amount => {
    switch (invoiceTemplate.details.templateType) {
        case TemplateType.InvoiceTemplateSingleLine:
            return getAmountFromSingleLine(invoiceTemplate.details as InvoiceTemplateSingleLine, configAmount);
        case TemplateType.InvoiceTemplateMultiLine:
            return getAmountFromMultiLine(invoiceTemplate.details as InvoiceTemplateMultiLine);
    }
};

const resolveInvoice = (invoiceCreated: InvoiceCreated): Amount => {
    const {invoice: {amount, currency}} = invoiceCreated;
    return {
        value: amount,
        currencyCode: currency
    };
};

export const resolveAmount = (m: ModelState, configAmount: number, invoiceEventsFirst: boolean = false): Amount => {
    if (!m || (!m.invoiceEvents && !m.invoiceTemplate)) {
        return null;
    }
    return m.invoiceTemplate && !invoiceEventsFirst
        ? resolveInvoiceTemplate(m.invoiceTemplate, configAmount)
        : resolveInvoice(findChange(m.invoiceEvents, InvoiceChangeType.InvoiceCreated) as InvoiceCreated);
};
