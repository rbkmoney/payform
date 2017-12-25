import { PaymentToolDetails } from './payment-tool-details';
import { PaymentToolDetailsType } from './payment-tool-details-type';

export class PaymentToolDetailsPaymentTerminal extends PaymentToolDetails {
    detailsType: PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal;
    provider: string;
}
