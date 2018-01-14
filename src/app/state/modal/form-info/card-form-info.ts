import { FormInfo, FormName } from './form-info';
import { SlideDirection } from 'checkout/state';
import { InvoiceTemplateLineCostRange, InvoiceTemplateLineCostUnlim } from 'checkout/backend';
import { PaymentStatus } from './payment-status';

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
    paymentStatus: PaymentStatus;

    constructor(height: number, fieldsConfig: FieldsConfig, active: boolean) {
        super({
            slideDirection: SlideDirection.right,
            height
        });
        this.name = FormName.cardForm;
        this.fieldsConfig = fieldsConfig;
        this.active = active;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
