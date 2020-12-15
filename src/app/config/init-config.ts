import { HoldExpirationType } from 'checkout/backend';
import { IntegrationType } from './integration-type';
import { PaymentMethodName } from './payment-method-name';

export class InitConfig {
    integrationType: IntegrationType;
    bankCard: boolean;
    applePay: boolean;
    googlePay: boolean;
    samsungPay: boolean;
    euroset: boolean;
    uzcard: boolean;
    qps: boolean;
    wallets: boolean;
    mobileCommerce: boolean;
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
    theme?: string;
    metadata?: object;
}
