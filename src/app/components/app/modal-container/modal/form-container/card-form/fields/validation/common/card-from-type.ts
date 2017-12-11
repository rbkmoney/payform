import cards from '../../common-card-tools/cards';
import { Card } from '../../common-card-tools';

export function cardFromType(type: string): Card {
    for (let i = 0, len = cards.length; i < len; i++) {
        const card = cards[i];
        if (card.type === type) {
            return card;
        }
    }
}
