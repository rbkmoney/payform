import * as creditCardType from 'credit-card-type';

type CardBrand = 'american-express' | 'diners-club' | 'discover' | 'jcb' | 'maestro' | 'master-card' | 'unionpay' | 'visa';
interface CreditCardTypeInfo {
        niceType?: string;
        type?: CardBrand;
        prefixPattern?: RegExp;
        exactPattern?: RegExp;
        gaps?: number[];
        lengths?: number[];
        code?: {
            name?: string;
            size?: number;
        };
    }

export function getCardType(cardNumber: string): CreditCardTypeInfo {
    return creditCardType(cardNumber)[0];
}
