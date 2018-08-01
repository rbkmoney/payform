import { InvoiceTemplate, InvoiceTemplateMultiLine, InvoiceTemplateSingleLine, TemplateType } from 'checkout/backend';
import { getAmountFromSingleLine } from './get-amount-from-single-line';
import { getAmountFromMultiLine } from './get-amount-from-multi-line';
import { AmountInfoState } from 'checkout/state';

export const resolveInvoiceTemplate = (invoiceTemplate: InvoiceTemplate, configAmount: number): AmountInfoState => {
    switch (invoiceTemplate.details.templateType) {
        case TemplateType.InvoiceTemplateSingleLine:
            return getAmountFromSingleLine(invoiceTemplate.details as InvoiceTemplateSingleLine, configAmount);
        case TemplateType.InvoiceTemplateMultiLine:
            return getAmountFromMultiLine(invoiceTemplate.details as InvoiceTemplateMultiLine);
    }
};
