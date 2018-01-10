import {
    add,
    AmountConfig,
    CardFormFlowItem,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    getLastEventID,
    init,
    DirectionTransition, EmailConfig, FieldsConfig
} from 'checkout/form-flow';
import {
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { InitConfig, IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';
import { ItemConfig } from 'checkout/form-flow/flow-item/card-form-flow-item';

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

const toEmailConfig = (c: InitConfig): EmailConfig => {
    if (c.email) {
        return {
            visible: false,
            value: c.email
        };
    } else {
        return {visible: true};
    }
};

const calcHeight = (fieldsConfig: FieldsConfig): number => {
    const count = Object.values(fieldsConfig)
        .reduce((acc: number, current: ItemConfig) => current.visible ? ++acc : acc, 0);
    return 288 + count * 52;
};

const toCardForm = (c: InitConfig, m: ModelState): CardFormFlowItem => {
    const fieldsConfig = {
        amount: toAmountConfig(c, m),
        email: toEmailConfig(c)
    };
    return new CardFormFlowItem({
        formName: FormName.cardForm,
        active: false,
        fieldsConfig,
        status: FormFlowStatus.unprocessed,
        handledEventID: getLastEventID(m.invoiceEvents),
        view: {
            slideDirection: DirectionTransition.right,
            height: calcHeight(fieldsConfig)
        }
    });
};

const isMultiMethods = (c: InitConfig, m: ModelState) => c.terminals && m.paymentMethods.length > 1;

export const initWithReadyToPay = (c: InitConfig, m: ModelState): FormFlowItem[] => {
    let result: FormFlowItem[] = [];
    if (isMultiMethods(c, m)) {
        result = add(result, {
            formName: FormName.paymentMethods,
            active: false,
            status: FormFlowStatus.unprocessed,
            view: {
                slideDirection: DirectionTransition.right,
                height: 100
            }
        });
    } else {
        result = add(result, toCardForm(c, m));
    }
    return init(result);
};
