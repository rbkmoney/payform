import cards from './cards';

export default function (type) {
    for (let _i = 0, _len = cards.length; _i < _len; _i++) {
        const card = cards[_i];
        if (card.type === type) {
            return card;
        }
    }
}
