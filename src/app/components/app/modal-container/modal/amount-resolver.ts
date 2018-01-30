import { IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import {
    ChangeType,
    Event, InvoiceCreated,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    PaymentStarted
} from 'checkout/backend';
import { Amount, findChange } from 'checkout/utils';

const getAmountFromSingleLine = (model: ModelState): Amount | null => {
    const details = model.invoiceTemplate.details as InvoiceTemplateSingleLine;
    const paymentStarted = findChange(model.invoiceEvents, ChangeType.PaymentStarted) as PaymentStarted;
    let result = null;
    const price = details.price;
    if (price && price.costType === 'InvoiceTemplateLineCostFixed') {
        const fixed = price as InvoiceTemplateLineCostFixed;
        result = {
            value: fixed.amount,
            currencyCode: fixed.currency
        };
    } else if (paymentStarted) {
        result = {
            value: paymentStarted.payment.amount,
            currencyCode: paymentStarted.payment.currency
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
            return getAmountFromInvoiceTemplate(m);
        case IntegrationType.invoice:
            return getAmountFromInvoice(m.invoiceEvents);
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};
