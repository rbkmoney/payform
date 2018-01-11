import { FormInfo, FormName } from './form-info';
import { CardFormValues, SlideDirection } from 'checkout/state';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';

export interface ItemConfig {
    visible: boolean;
}

export interface AmountConfig extends ItemConfig {
    cost?: InvoiceTemplateLineCostRange | InvoiceTemplateLineCostUnlim;
}

export interface EmailConfig extends ItemConfig {
    value?: string;
}

export interface FieldsConfig {
    amount: AmountConfig;
    email: EmailConfig;
}

export class CardFormInfo extends FormInfo {

    fieldsConfig: FieldsConfig;
    values?: CardFormValues;
    needToReset?: boolean;

    constructor(height: number, fieldsConfig: FieldsConfig) {
        super({
            slideDirection: SlideDirection.right,
            height
        });
        this.name = FormName.cardForm;
        this.fieldsConfig = fieldsConfig;
    }
}
