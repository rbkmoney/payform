import { PaymentMethod, PaymentMethodName } from './payment-method';
import { TerminalProviders } from './terminal-providers';

export class PaymentTerminal extends PaymentMethod {
    method: PaymentMethodName.PaymentTerminal;
    providers: TerminalProviders[];
}
