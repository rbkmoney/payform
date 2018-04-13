import { PaymentSystem } from './payment-system';
import { PaymentMethod, PaymentMethodName } from './payment-method';
import { BankCardTokenProvider } from './bank-card-token-provider';

export class BankCard extends PaymentMethod {
    method: PaymentMethodName.BankCard;
    paymentSystems: PaymentSystem[];
    tokenProviders: BankCardTokenProvider[];
}
