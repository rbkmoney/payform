import { InvoiceChange } from './invoice-change';
import { ChangeType } from './change-type';

export class PaymentInteractionRequested extends InvoiceChange {
    changeType = ChangeType.PaymentInteractionRequested;
    paymentID: string;
    userInteraction: any; // TODO need type
}
