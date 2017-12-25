import cards from './cards';
import { Card } from './cards-type';

export function cardFromNumber(num: string): Card {
    num = (num + '').replace(/\D/g, '');
    for (let i = 0, len1 = cards.length; i < len1; i++) {
        const card = cards[i];
        const ref = card.patterns;
        for (let j = 0, len2 = ref.length; j < len2; j++) {
            const pattern = ref[j];
            const p = pattern + '';
            if (num.substr(0, p.length) === p) {
                return card;
            }
        }
    }
}
