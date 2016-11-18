import cards from './cards';

export default function (type) {
    var card, _i, _len;
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
        card = cards[_i];
        if (card.type === type) {
            return card;
        }
    }
}
