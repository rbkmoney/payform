import { PaymentSystem } from './payment-system';
import { PaymentMethod, PaymentMethodName } from './payment-method';

export class DigitalWallet extends PaymentMethod {
    method: PaymentMethodName.DigitalWallet;
    paymentSystems: PaymentSystem[];
}
