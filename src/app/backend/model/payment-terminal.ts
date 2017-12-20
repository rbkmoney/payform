import { PaymentMethod, PaymentMethodsNames } from './payment-method';

export class PaymentTerminal extends PaymentMethod {
    method: PaymentMethodsNames.PaymentTerminal;
    providers: 'euroset';
}
