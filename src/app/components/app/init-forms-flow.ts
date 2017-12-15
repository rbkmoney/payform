import { InitConfig, IntegrationType } from 'checkout/config';
import {
    FormFlowItem,
    FormName,
    AmountConfig,
    CardFormFlowItem,
    FormFlowStatus, add, init, ResultFormFlowItem
} from 'checkout/form-flow';
import {
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { ModelState } from 'checkout/state';
import { check, EventCheckResult, Type } from 'checkout/event-checker';

const toSingleLineAmountConfig = (c: InvoiceTemplateSingleLine): AmountConfig => {
    const result = {visible: false} as AmountConfig;
    switch (c.price.costType) {
        case 'InvoiceTemplateLineCostUnlim':
            result.visible = true;
            result.cost = c.price as InvoiceTemplateLineCostUnlim;
            break;
        case 'InvoiceTemplateLineCostRange':
            result.visible = true;
            result.cost = c.price as InvoiceTemplateLineCostRange;
            break;
    }
    return result;
};

const toTemplateAmountConfig = (t: InvoiceTemplate): AmountConfig => {
    switch (t.details.templateType) {
        case 'InvoiceTemplateSingleLine':
            return toSingleLineAmountConfig(t.details as InvoiceTemplateSingleLine);
    }
    return {visible: false};
};

const toAmountConfig = (c: InitConfig, m: ModelState): AmountConfig => {
    switch (c.integrationType) {
        case IntegrationType.invoiceTemplate:
            return toTemplateAmountConfig(m.invoiceTemplate);
    }
    return {visible: false};
};

const toCardForm = (c: InitConfig, m: ModelState): CardFormFlowItem => ({
    formName: FormName.cardForm,
    active: false,
    amountConfig: toAmountConfig(c, m),
    status: FormFlowStatus.unprocessed
});

const isMultiMethods = (initConfig: InitConfig, model: ModelState) => {
    return initConfig.terminals && model.paymentMethods.length > 1;
};

const handleUnexplained = (initConfig: InitConfig, model: ModelState): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    if (isMultiMethods(initConfig, model)) {
        result = add(result, {
            formName: FormName.paymentMethods,
            active: false,
            status: FormFlowStatus.unprocessed
        });
    } else {
        result = add(result, toCardForm(initConfig, model));
    }
    return init(result);
};

const handleSuccessFailed = (checkResult: EventCheckResult): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    result = add(result, {
        formName: FormName.resultForm,
        active: false,
        change: checkResult.change
    } as ResultFormFlowItem);
    return init(result);
};

export const initFormsFlow = (initConfig: InitConfig, model: ModelState): FormFlowItem[] => {
    const checkResult = check(model.invoiceEvents);
    switch (checkResult.type) {
        case Type.success:
            return handleSuccessFailed(checkResult);
        case Type.unexplained:
        case Type.failed:
            return handleUnexplained(initConfig, model);
        case Type.interaction:
            throw new Error('Unsupported event type');
    }
};
