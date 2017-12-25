import { InvoiceChange } from './invoice-change';
import { ChangeType } from './change-type';
import { UserInteraction } from './user-interaction';

export class PaymentInteractionRequested extends InvoiceChange {
    changeType = ChangeType.PaymentInteractionRequested;
    paymentID: string;
    userInteraction: UserInteraction;
}
