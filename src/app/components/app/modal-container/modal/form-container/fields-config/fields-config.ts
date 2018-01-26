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
