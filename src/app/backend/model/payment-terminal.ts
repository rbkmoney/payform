import { PaymentMethod, PaymentMethodsEnum } from './payment-method';

export class PaymentTerminal extends PaymentMethod {
    method: PaymentMethodsEnum.PaymentTerminal;
    providers: 'euroset';
}
