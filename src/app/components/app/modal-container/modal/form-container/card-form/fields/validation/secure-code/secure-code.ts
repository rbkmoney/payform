import { isValidSecureCode } from './is-valid-secure-code';
import { cardFromNumber } from '../../common-card-tools';

export function validateSecureCode(value: any, allValues?: any): boolean {
    if (!value) {
        return true;
    }
    const cardType = cardFromNumber(allValues.cardNumber).type;

    return !isValidSecureCode(value, cardType);
}
