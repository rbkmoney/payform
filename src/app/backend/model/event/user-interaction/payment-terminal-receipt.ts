import { UserInteraction } from './user-interaction';

export class PaymentTerminalReceipt extends UserInteraction {
    shortPaymentID: string;
    dueDate: string;
}
