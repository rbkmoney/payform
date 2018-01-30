import { IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import {
    ChangeType,
    InvoiceCreated,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
} from 'checkout/backend';
import { Amount, findChange } from 'checkout/utils';

const getAmountFromSingleLine = (model: ModelState): Amount | null => {
    const details = model.invoiceTemplate.details as InvoiceTemplateSingleLine;
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

const getAmountFromInvoiceTemplate = (model: ModelState): Amount => {
    switch (model.invoiceTemplate.details.templateType) {
        case 'InvoiceTemplateSingleLine':
            return getAmountFromSingleLine(model);
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

export const getAmount = (integrationType: IntegrationType, m: ModelState): Amount | null => {
    const invoiceCreated = findChange(m.invoiceEvents, ChangeType.InvoiceCreated);
    return invoiceCreated ? getAmountFromInvoice(invoiceCreated as InvoiceCreated) : getAmountFromInvoiceTemplate(m);
};
