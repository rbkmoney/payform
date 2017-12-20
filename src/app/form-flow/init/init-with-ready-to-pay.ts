import {
    add,
    AmountConfig,
    CardFormFlowItem,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getLastEventID,
    init
} from 'checkout/form-flow';
import {
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { InitConfig, IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { FlowItemViewAnimation } from 'checkout/form-flow/flow-item/flow-item-view';

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
    status: FormFlowStatus.unprocessed,
    handledEventID: getLastEventID(m.invoiceEvents),
    view: {
        animation: FlowItemViewAnimation.formsAnimation
    }
});

const isMultiMethods = (initConfig: InitConfig, model: ModelState) => {
    return initConfig.terminals && model.paymentMethods.length > 1;
};

export const initWithReadyToPay = (c: InitConfig, m: ModelState): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    if (isMultiMethods(c, m)) {
        result = add(result, {
            formName: FormName.paymentMethods,
            active: false,
            status: FormFlowStatus.unprocessed,
            view: {
                animation: FlowItemViewAnimation.formsAnimation
            }
        });
    } else {
        result = add(result, toCardForm(c, m));
    }
    return init(result);
};
