import { FormFlowItem } from './flow-item';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { CardFormValues } from 'checkout/state';
import { FormName } from 'checkout/form-flow';

export interface ItemConfig {
    visible: boolean;
}

export interface FieldsConfig {
    amount: AmountConfig;
    email: EmailConfig;
}

export interface AmountConfig extends ItemConfig {
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export interface EmailConfig extends ItemConfig {
    value?: string;
}

export class CardFormFlowItem extends FormFlowItem {
    fieldsConfig: FieldsConfig;
    values?: CardFormValues;
    needToReset?: boolean;

    constructor(props: CardFormFlowItem) {
        super();

        this.fieldsConfig = props.fieldsConfig;
        this.values = props.values;
        this.needToReset = props.needToReset;
        this.formName = FormName.cardForm;
        this.view = props.view;
    }
}
