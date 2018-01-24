import { FormInfo, FormName } from './form-info';
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

    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.walletForm;
        this.active = true;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
