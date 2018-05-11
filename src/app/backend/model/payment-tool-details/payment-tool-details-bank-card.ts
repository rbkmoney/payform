import { PaymentToolDetails } from './payment-tool-details';

export class PaymentToolDetailsBankCard extends PaymentToolDetails {
    cardNumberMask: string;
    bin: string;
    lastDigits: string;
    paymentSystem: string;
}
