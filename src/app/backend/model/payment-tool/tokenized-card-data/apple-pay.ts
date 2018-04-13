import { TokenizedCardData } from './tokenized-card-data';

export class ApplePay extends TokenizedCardData {
    merchantID: string;
    paymentToken: any;
}
