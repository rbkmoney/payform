import {
    InvoiceTemplate,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    TemplateType
} from 'checkout/backend';
import { Amount } from '../amount';
import { getAmountFromSingleLine } from './get-amount-from-single-line';
import { getAmountFromMultiLine } from './get-amount-from-multi-line';

export const resolveInvoiceTemplate = (invoiceTemplate: InvoiceTemplate, configAmount: number): Amount => {
    switch (invoiceTemplate.details.templateType) {
        case TemplateType.InvoiceTemplateSingleLine:
            return getAmountFromSingleLine(invoiceTemplate.details as InvoiceTemplateSingleLine, configAmount);
        case TemplateType.InvoiceTemplateMultiLine:
            return getAmountFromMultiLine(invoiceTemplate.details as InvoiceTemplateMultiLine);
    }
};
