import { PaymentFlow } from './payment-flow';
import { Payer } from './payer';
import { LogicError } from './logic-error';
import { PaymentStatus } from './payment-status';

export class Payment {
    id: string;
    invoiceID: string;
    createdAt: string;
    amount: number;
    currency: string;
    flow: PaymentFlow;
    payer: Payer;
    status: PaymentStatus;
    error: LogicError;
}
