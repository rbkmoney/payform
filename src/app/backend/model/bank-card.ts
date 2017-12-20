import { PaymentSystem } from './payment-system';
import { PaymentMethod, PaymentMethodsNames } from './payment-method';

export class BankCard extends PaymentMethod {
    method: PaymentMethodsNames.BankCard;
    paymentSystems: PaymentSystem[];
}
