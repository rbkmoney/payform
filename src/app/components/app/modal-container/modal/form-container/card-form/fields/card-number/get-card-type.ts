import * as creditCardType from 'credit-card-type';
import {CreditCardTypeInfo} from 'credit-card-type';

export function getCardType(cardNumber: string): CreditCardTypeInfo {
    return creditCardType(cardNumber)[0];
}
