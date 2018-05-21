import { AmountInfoStatus } from './amount-info-type';

export interface AmountInfoState {
    status: AmountInfoStatus;
    currencyCode: string;
    minorValue?: number;
}
