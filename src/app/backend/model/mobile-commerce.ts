import { PaymentMethod, PaymentMethodName } from './payment-method';

export class MobileCommerce extends PaymentMethod {
    method: PaymentMethodName = PaymentMethodName.MobileCommerce;
}
