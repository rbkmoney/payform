import { PaymentSystem } from './payment-system';
import { PaymentMethod } from './payment-method';

export class BankCard extends PaymentMethod {
    method: 'BankCard';
    paymentSystems: PaymentSystem[];
}
