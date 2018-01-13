import { values } from 'lodash';
import {
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import {
    FieldsConfig,
    CardFormInfo,
    ItemConfig,
    AmountConfig,
    EmailConfig
} from 'checkout/state';
import { InitConfig, IntegrationType } from 'checkout/config';

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

const toAmountConfig = (type: IntegrationType, template: InvoiceTemplate): AmountConfig => {
    switch (type) {
        case IntegrationType.invoiceTemplate:
            return toTemplateAmountConfig(template);
    }
    return {visible: false};
};

const toEmailConfig = (email: string): EmailConfig => {
    return email
        ? {visible: false, value: email}
        : {visible: true};
};

const toFieldsConfig = (c: InitConfig, t: InvoiceTemplate): FieldsConfig => ({
    amount: toAmountConfig(c.integrationType, t),
    email: toEmailConfig(c.email)
});

const calcHeight = (fieldsConfig: FieldsConfig): number => {
    const count = values(fieldsConfig)
        .reduce((acc: number, current: ItemConfig) => current.visible ? ++acc : acc, 0);
    return 288 + count * 52;
};

export const toCardFormInfo = (c: InitConfig, t: InvoiceTemplate): CardFormInfo => {
    const fieldConfig = toFieldsConfig(c, t);
    return new CardFormInfo(calcHeight(fieldConfig), fieldConfig);
};
