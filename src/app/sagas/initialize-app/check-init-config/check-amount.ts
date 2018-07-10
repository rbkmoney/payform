import inRange from 'lodash-es/inRange';
import {
    CostType,
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateSingleLine,
    TemplateType
} from 'checkout/backend';
import { CheckResult, UnavailableReason } from 'checkout/sagas/log-unavailable-result';
import { IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';

const checkAmountCapableForTemplateCostRange = (amount: number, cost: InvoiceTemplateLineCostRange): CheckResult => {
    const {range: {lowerBound, upperBound}} = cost;
    const available = inRange(amount, lowerBound, upperBound);
    return {
        available,
        reason: available ? null : UnavailableReason.validation,
        message: available ? null : `Value of param 'amount' should be in range from ${lowerBound} to ${upperBound}. Current amount value: ${amount}.`
    };
};

const checkAmountCapableForTemplateSingleLine = (amount: number, details: InvoiceTemplateSingleLine): CheckResult => {
    const price = details.price;
    switch (price.costType) {
        case CostType.InvoiceTemplateLineCostFixed:
            return {
                available: false,
                reason: UnavailableReason.capability,
                message: 'Param \'amount\' is only available for invoice templates with range or unlim cost types. Current invoice template has fixed cost type.'
            };
        case CostType.InvoiceTemplateLineCostRange:
            return checkAmountCapableForTemplateCostRange(amount, price as InvoiceTemplateLineCostRange);
        case CostType.InvoiceTemplateLineCostUnlim:
            return {available: true};
    }
};

const checkAmountCapableForTemplate = (amount: number, t: InvoiceTemplate): CheckResult => {
    switch (t.details.templateType) {
        case TemplateType.InvoiceTemplateMultiLine:
            return {
                available: false,
                reason: UnavailableReason.capability,
                message: 'Param \'amount\' is only available for single line invoice templates. Current invoice template has multi line type.'
            };
        case TemplateType.InvoiceTemplateSingleLine:
            return checkAmountCapableForTemplateSingleLine(amount, t.details as InvoiceTemplateSingleLine);
    }
};

export const checkAmount = (t: IntegrationType, m: ModelState, amount: number): CheckResult => {
    switch (t) {
        case IntegrationType.invoiceTemplate:
            return checkAmountCapableForTemplate(amount, m.invoiceTemplate);
        case IntegrationType.invoice:
        case IntegrationType.customer:
            return {
                available: false,
                reason: UnavailableReason.capability,
                message: 'Param \'amount\' is only available for invoice templates.'
            };
    }
};
