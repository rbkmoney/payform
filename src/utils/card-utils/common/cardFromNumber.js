import cards from './cards';

export default function (num) {
    num = (num + '').replace(/\D/g, '');
    for (let _i = 0, _len = cards.length; _i < _len; _i++) {
        const card = cards[_i];
        const _ref = card.patterns;
        for (let _j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            const pattern = _ref[_j];
            const p = pattern + '';
            if (num.substr(0, p.length) === p) {
                return card;
            }
        }
    }
}
