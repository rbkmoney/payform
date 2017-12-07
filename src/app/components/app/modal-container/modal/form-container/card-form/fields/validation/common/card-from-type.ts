import cards from '../../common-card-tools/cards';

export function cardFromType(type: string) {
    for (let i = 0, len = cards.length; i < len; i++) {
        const card = cards[i];
        if (card.type === type) {
            return card;
        }
    }
}
