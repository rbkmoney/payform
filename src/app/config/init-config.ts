import { HoldExpirationType } from 'checkout/backend';
import { IntegrationType } from './integration-type';
import { PaymentMethodName } from './payment-method-name';
import { ExtInitConfig } from './ext-init-config';

export class InitConfig extends ExtInitConfig {
    integrationType: IntegrationType;
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
    theme?: string;
}
