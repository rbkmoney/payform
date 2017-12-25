import { PaymentTool } from './payment-tool';
import { PaymentToolType } from './payment-tool-type';

export class CardData extends PaymentTool {
    paymentToolType = PaymentToolType.CardData;
    cardNumber: string;
    expDate: string;
    cvv: string;
    cardHolder?: string;
}
