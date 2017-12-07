import { isValidSecureCode } from './is-valid-secure-code';
import { cardFromNumber } from '../../common-card-tools/card-from-number';

export function validateSecureCode(code: string, cardNumber: string): boolean {
    if (!code) {
        return true;
    }
    const cardType = cardFromNumber(cardNumber).type;

    return !isValidSecureCode(code, cardType);
}
