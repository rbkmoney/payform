import { PaymentFlow } from './payment-flow';
import { Payer } from './payer';

export class PaymentParams {
    flow: PaymentFlow;
    payer: Payer;
    makeRecurrent: boolean;
}
