import {
    add,
    AmountConfig,
    CardFormFlowItem,
    FormFlowItem,
    FormFlowStatus,
    FormName,
    FormHeight,
    getLastEventID,
    init,
    DirectionTransition, EmailConfig
} from 'checkout/form-flow';
import {
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { InitConfig, IntegrationType } from 'checkout/config';
import { ModelState } from 'checkout/state';

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
            email: c.email
        };
    } else {
        return {visible: true};
    }
};

const toCardFormSize = (amountConfig: AmountConfig, emailConfig: EmailConfig): number => {
    let result = 0;
    amountConfig.visible ? ++result : false;
    emailConfig.visible ? ++result : false;
    return 288 + result * 52;
};

const toCardForm = (c: InitConfig, m: ModelState): CardFormFlowItem => {
    const amountConfig = toAmountConfig(c, m);
    const emailConfig = toEmailConfig(c);
    return new CardFormFlowItem({
        formName: FormName.cardForm,
        active: false,
        amountConfig,
        emailConfig,
        status: FormFlowStatus.unprocessed,
        handledEventID: getLastEventID(m.invoiceEvents),
        view: {
            slideDirection: DirectionTransition.right,
            height: toCardFormSize(amountConfig, emailConfig)
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
