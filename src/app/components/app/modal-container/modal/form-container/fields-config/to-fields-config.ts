import {
    InvoiceTemplate,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateSingleLine
} from 'checkout/backend';
import { InitConfig, IntegrationType } from 'checkout/config';
import { AmountConfig, EmailConfig, FieldsConfig } from './fields-config';

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

export const toFieldsConfig = (c: InitConfig, t: InvoiceTemplate): FieldsConfig => ({
    amount: toAmountConfig(c.integrationType, t),
    email: toEmailConfig(c.email)
});
