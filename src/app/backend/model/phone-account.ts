import { PaymentMethod, PaymentMethodName } from './payment-method';

export class PhoneAccount extends PaymentMethod {
    method: PaymentMethodName = PaymentMethodName.MobileCommerce;
}
