const cardType = require('credit-card-type');

interface CardInfo {
    code: {
        name: string,
        cvv: number
    };
    gaps: number[];
    lengths: number[];
    niceType: string;
    type: string;
}

export function getCardType(cardNumber: string): CardInfo {
    return cardType(cardNumber)[0];
}
