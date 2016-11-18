import restrictNumeric from './format/restrictNumeric';
import restrictCardNumber from './format/restrictCardNumber';
import formatCardNumber from './format/formatCardNumber';
import formatBackCardNumber from './format/formatBackCardNumber';
import reFormatCardNumber from './format/reFormatCardNumber';
import restrictCVC from './format/restrictCVC';
import reFormatCVC from './format/reFormatCVC';
import restrictExpiry from './format/restrictExpiry';
import formatExpiry from './format/formatExpiry';
import formatForwardSlashAndSpace from './format/formatForwardSlashAndSpace';
import formatForwardExpiry from './format/formatForwardExpiry';
import formatBackExpiry from './format/formatBackExpiry';
import reFormatExpiry from './format/reFormatExpiry';
import cardExpiryVal from './common/cardExpiryVal';
import cardType from './common/cardType';
import validateCardNumber from './validation/validateCardNumber';
import validateCardExpiry from './validation/validateCardExpiry';
import validateCardCvv from './validation/validateCardCvv';

export default class CardUtils {

    static formatCardNumber(element) {
        element.addEventListener('keypress', restrictNumeric);
        element.addEventListener('keypress', restrictCardNumber);
        element.addEventListener('keypress', formatCardNumber);
        element.addEventListener('keydown', formatBackCardNumber);
        element.addEventListener('paste', reFormatCardNumber);
        element.addEventListener('change', reFormatCardNumber);
        element.addEventListener('input', reFormatCardNumber);
    }

    static formatCardCvv(element) {
        element.addEventListener('keypress', restrictNumeric);
        element.addEventListener('keypress', restrictCVC);
        element.addEventListener('paste', reFormatCVC);
        element.addEventListener('change', reFormatCVC);
        element.addEventListener('input', reFormatCVC);
    }

    static formatCardExpiry(element) {
        element.addEventListener('keypress', restrictNumeric);
        element.addEventListener('keypress', restrictExpiry);
        element.addEventListener('keypress', formatExpiry);
        element.addEventListener('keypress', formatForwardSlashAndSpace);
        element.addEventListener('keypress', formatForwardExpiry);
        element.addEventListener('keydown', formatBackExpiry);
        element.addEventListener('change', reFormatExpiry);
        element.addEventListener('input', reFormatExpiry);
    }

    static cardType(num) {
        return cardType(num);
    }

    static validateCardCvv(cvc, type) {
        return validateCardCvv(cvc, type);
    }

    static validateCardExpiry(value) {
        const formatVal = cardExpiryVal(value);
        return validateCardExpiry(formatVal);
    }

    static validateCardNumber(num) {
        return validateCardNumber(num);
    }

}
