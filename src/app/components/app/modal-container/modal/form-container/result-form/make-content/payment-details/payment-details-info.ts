import { PaymentToolDetailsType } from 'checkout/backend';

export interface PaymentDetailsInfo {
    type: PaymentToolDetailsType;
    info: string;
}
