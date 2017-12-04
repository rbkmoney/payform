import { PaymentMethod } from './payment-method';

export class PaymentTerminal extends PaymentMethod {
    method: 'PaymentTerminal';
    providers: 'euroset';
}
