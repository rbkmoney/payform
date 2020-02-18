import { PaymentMethodName } from './payment-method-name';
import { PaymentMethodGroupName } from './payment-method-group-name';

export class PaymentMethod {
    name: PaymentMethodName | PaymentMethodGroupName;
    priority?: number;
    children?: PaymentMethod[];
}
