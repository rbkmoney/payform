import { Payer } from './payer';
import { PayerType } from './payer-type';

export class CustomerPayer extends Payer {
    payerType: PayerType.CustomerPayer;
    customerID: string;
}
