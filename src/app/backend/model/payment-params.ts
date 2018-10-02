import { PaymentFlow, PaymentFlowHold } from './payment-flow';
import { Payer } from './payer';

export class PaymentParams {
    flow: PaymentFlow | PaymentFlowHold;
    payer: Payer;
    makeRecurrent: boolean;
}
