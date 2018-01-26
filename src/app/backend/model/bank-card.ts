import { PaymentSystem } from './payment-system';
import { PaymentMethod, PaymentMethodName } from './payment-method';

export class BankCard extends PaymentMethod {
    method: PaymentMethodName.BankCard;
    paymentSystems: PaymentSystem[];
}
