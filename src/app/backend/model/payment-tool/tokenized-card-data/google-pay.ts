import { TokenizedCardData } from './tokenized-card-data';

export class GooglePay extends TokenizedCardData {
    merchantID: string;
    paymentToken: any;
}
