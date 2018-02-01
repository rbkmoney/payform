import { InvoiceChange } from './invoice-change';
import { InvoiceChangeType } from './invoice-change-type';
import { UserInteraction } from './user-interaction';

export class PaymentInteractionRequested extends InvoiceChange {
    changeType = InvoiceChangeType.PaymentInteractionRequested;
    paymentID: string;
    userInteraction: UserInteraction;
}
