import { PaymentSystem } from './payment-system';
import { PaymentMethod, PaymentMethodsEnum } from './payment-method';

export class BankCard extends PaymentMethod {
    method: PaymentMethodsEnum.BankCard;
    paymentSystems: PaymentSystem[];
}
