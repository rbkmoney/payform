import cards from './cards';

export default function (num) {
    var card, p, pattern, _i, _j, _len, _len1, _ref;
    num = (num + '').replace(/\D/g, '');
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
        card = cards[_i];
        _ref = card.patterns;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            pattern = _ref[_j];
            p = pattern + '';
            if (num.substr(0, p.length) === p) {
                return card;
            }
        }
    }
}
