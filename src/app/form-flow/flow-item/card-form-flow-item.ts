import { FormFlowItem } from './flow-item';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { CardFormValues } from 'checkout/state';
import { FormName } from 'checkout/form-flow';

export class Config {
    visible: boolean;
}

export class AmountConfig extends Config {
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export class EmailConfig extends Config {
    email?: string;
}

export class CardFormFlowItem extends FormFlowItem {
    formName: FormName.cardForm;
    amountConfig: AmountConfig;
    emailConfig: EmailConfig;
    values?: CardFormValues;
    needToReset?: boolean;
}
