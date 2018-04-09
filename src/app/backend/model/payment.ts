import { PaymentFlow } from './payment-flow';
import { Payer } from './payer';
import { PaymentStatus } from './payment-status';
import { PaymentError } from 'checkout/backend';

export class Payment {
    id: string;
    invoiceID: string;
    createdAt: string;
    amount: number;
    currency: string;
    flow: PaymentFlow;
    payer: Payer;
    status: PaymentStatus;
    error: PaymentError;
}
