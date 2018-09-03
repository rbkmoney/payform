import { ClientInfo } from './client-info';
import { PaymentToolDetails } from './payment-tool-details';

export class PaymentResource {
    paymentToolToken: string;
    paymentSession: string;
    recurringSession: string;
    paymentToolDetails: PaymentToolDetails;
    clientInfo: ClientInfo;
}
