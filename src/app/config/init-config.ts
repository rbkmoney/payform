import { HoldExpirationType } from 'checkout/backend';
import { IntegrationType } from './integration-type';
import { PaymentMethodName } from './payment-method-name';

export class InitConfig {
    integrationType: IntegrationType;
    invoiceTemplateID?: string;
    invoiceTemplateAccessToken?: string;
    invoiceID?: string;
    invoiceAccessToken?: string;
    customerID?: string;
    customerAccessToken?: string;
    bankCard: boolean;
    applePay: boolean;
    googlePay: boolean;
    samsungPay: boolean;
    terminals: boolean;
    wallets: boolean;
    paymentFlowHold: boolean;
    holdExpiration: HoldExpirationType;
    locale: string;
    redirectUrl?: string;
    name?: string;
    description?: string;
    email?: string;
    amount?: number;
    obscureCardCvv?: boolean;
    requireCardHolder?: boolean;
    initialPaymentMethod?: PaymentMethodName;
    recurring?: boolean;
}
