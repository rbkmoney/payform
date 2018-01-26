import { PaymentMethod, PaymentMethodName } from './payment-method';

export class PaymentTerminal extends PaymentMethod {
    method: PaymentMethodName.PaymentTerminal;
    providers: 'euroset';
}
