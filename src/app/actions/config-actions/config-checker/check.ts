import inRange from 'lodash-es/inRange';
import { InitConfig, IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import {
    InvoiceTemplate,
    TemplateType,
    InvoiceTemplateSingleLine,
    CostType,
    InvoiceTemplateLineCostRange
} from 'checkout/backend';
import { logPrefix, sadnessMessage } from 'checkout/log-messages';

enum UnavailableReason {
    capability = 'capability',
    validation = 'validation'
}

interface CheckResult {
    available: boolean;
    reason?: UnavailableReason;
    message?: string;
}

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

const checkAmount = (t: IntegrationType, m: ModelState, amount: number): CheckResult => {
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

const logUnavailableResult = (param: string, result: CheckResult) => {
    if (result.available) {
        return;
    }
    const prepareMessage = (availability: string) => `${logPrefix} Param '${param}' is ${availability}. ${result.message} ${sadnessMessage}`;
    let message;
    switch (result.reason) {
        case UnavailableReason.capability:
            message = prepareMessage('unavailable');
            break;
        case UnavailableReason.validation:
            message = prepareMessage('invalid');
            break;
    }
    console.warn(message);
};

type CheckFn = (t: IntegrationType, m: ModelState, field: any) => CheckResult;

const checkAndLog = (param: string, initConfig: InitConfig, m: ModelState, checkFn: CheckFn): boolean => {
    const usableByIndex = initConfig as any;
    let result = false;
    if (usableByIndex[param]) {
        const checkResult = checkFn(initConfig.integrationType, m, usableByIndex[param]);
        checkResult.available ? result = true : logUnavailableResult(param, checkResult);
    }
    return result;
};

export const checkInitConfigCapability = (c: InitConfig, m: ModelState): InitConfig => ({
    ...c,
    amount: checkAndLog('amount', c, m, checkAmount) ? c.amount : null
});
