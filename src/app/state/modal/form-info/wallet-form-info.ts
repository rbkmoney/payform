import { FormInfo, FormName } from './form-info';
import { SlideDirection } from 'checkout/state';
import { PaymentStatus } from './payment-status';
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

export class WalletFormInfo extends FormInfo {

    fieldsConfig: FieldsConfig;
    paymentStatus: PaymentStatus;

    constructor(height: number, fieldsConfig: FieldsConfig, active: boolean, previous: FormName) {
        super({
            slideDirection: SlideDirection.right,
            height
        }, previous);
        this.name = FormName.walletForm;
        this.active = active;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
