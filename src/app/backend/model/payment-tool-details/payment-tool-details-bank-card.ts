import { PaymentToolDetails } from './payment-tool-details';

export class PaymentToolDetailsBankCard extends PaymentToolDetails {
    cardNumberMask: string;
    first6: string;
    last4: string;
    paymentSystem: string;
}
