import { PaymentToolDetails } from './payment-tool-details';
import { PaymentToolDetailsType } from './payment-tool-details-type';

export class PaymentToolDetailsBankCard extends PaymentToolDetails {
    detailsType: PaymentToolDetailsType.PaymentToolDetailsBankCard;
    cardNumberMask: string;
    paymentSystem: string;
}
