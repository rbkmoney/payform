import { Payer } from './payer';
import { PaymentToolDetails } from '../payment-tool-details';
import { ClientInfo } from '../client-info';
import { ContactInfo } from '../contact-info';
import { PayerType } from './payer-type';

export class PaymentResourcePayer extends Payer {
    payerType: PayerType.PaymentResourcePayer;
    paymentToolToken: string;
    paymentSession: string;
    contactInfo: ContactInfo;
    paymentToolDetails?: PaymentToolDetails;
    clientInfo?: ClientInfo;
}
