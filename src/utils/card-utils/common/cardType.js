import cardFromNumber from '../common/cardFromNumber';

export default function (num) {
    let _ref;
    if (!num) {
        return null;
    }
    return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
}
