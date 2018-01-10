import { FormFlowItem } from './flow-item';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { CardFormValues } from 'checkout/state';
import { FormName } from 'checkout/form-flow';

export interface ItemConfig {
    visible: boolean;
}

export interface AmountConfig extends ItemConfig {
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export interface EmailConfig extends ItemConfig {
    email?: string;
}

export class CardFormFlowItem extends FormFlowItem {
    amountConfig: AmountConfig;
    emailConfig: EmailConfig;
    values?: CardFormValues;
    needToReset?: boolean;

    constructor(props: CardFormFlowItem) {
        super();

        this.amountConfig = props.amountConfig;
        this.emailConfig = props.emailConfig;
        this.values = props.values;
        this.needToReset = props.needToReset;
        this.formName = FormName.cardForm;
        this.view = props.view;
    }
}
