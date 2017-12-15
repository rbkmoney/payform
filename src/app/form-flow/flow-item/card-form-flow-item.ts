import { FormFlowItem } from './flow-item';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { CardFormValues } from 'checkout/state';
import { FormName } from 'checkout/form-flow';

export interface AmountConfig {
    visible: boolean;
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export class CardFormFlowItem extends FormFlowItem {
    formName: FormName.cardForm;
    amountConfig: AmountConfig;
    values?: CardFormValues;
}
