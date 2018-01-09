import { FormFlowItem } from './flow-item';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { CardFormValues } from 'checkout/state';
import { FormName } from 'checkout/form-flow';
import { ItemConfig } from 'checkout/form-flow/flow-item/item-config';

export interface AmountConfig extends ItemConfig {
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export interface EmailConfig extends ItemConfig {
    email?: string;
}

export class CardFormFlowItem extends FormFlowItem {
    formName: FormName.cardForm;
    amountConfig: AmountConfig;
    emailConfig: EmailConfig;
    values?: CardFormValues;
    needToReset?: boolean;
}
