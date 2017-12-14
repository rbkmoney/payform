import { FormFlowItem } from './flow-item';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { FormName, CardFormValues } from 'checkout/state';

export interface AmountConfig {
    visible: boolean;
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export class CardFormFlowItem extends FormFlowItem {
    formName: FormName.cardForm;
    amountConfig: AmountConfig;
    values?: CardFormValues;
}
