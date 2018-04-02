import { findChange } from '../../event-utils';
import { ModelState } from 'checkout/state';
import { InvoiceChangeType, InvoiceCreated } from 'checkout/backend';
import { Amount } from '../amount';
import { resolveInvoice } from './resolve-invoice';
import { resolveInvoiceTemplate } from './resolve-invoice-template';

export const resolveAmount = (m: ModelState, configAmount: number, invoiceEventsFirst: boolean = false): Amount => {
    if (!m || (!m.invoiceEvents && !m.invoiceTemplate)) {
        return null;
    }
    return m.invoiceTemplate && !invoiceEventsFirst
        ? resolveInvoiceTemplate(m.invoiceTemplate, configAmount)
        : resolveInvoice(findChange(m.invoiceEvents, InvoiceChangeType.InvoiceCreated) as InvoiceCreated);
};
