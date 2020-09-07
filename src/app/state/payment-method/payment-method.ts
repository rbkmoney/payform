import { PaymentMethodName } from './payment-method-name';

export class PaymentMethod {
    name: PaymentMethodName;
    priority?: number;
    children?: PaymentMethod[];
}
