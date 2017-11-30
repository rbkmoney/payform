enum CardTypes {
    maestro = 'maestro',
    forbrugsforeningen = 'forbrugsforeningen',
    dankort = 'dankort',
    visa = 'visa',
    mastercard = 'mastercard',
    amex = 'amex',
    dinersclub = 'dinersclub',
    discover = 'discover',
    unionpay = 'unionpay',
    jcb = 'jcb',
    test = 'test'
}

export class Card {
    type: CardTypes;
    patterns: number[];
    format: RegExp;
    length: number[];
    cvcLength: number[];
    luhn: boolean;
}