import { restrictNumeric } from '../common/restrict-numeric';
import { restrictCardNumber } from './restrict-card-number';
import { formatNumber } from './format-number';
import { formatBackCardNumber } from './format-back-card-number';
import { reFormatCardNumber } from './re-format-card-number';

export function cardNumberFormatter(element: Element) {
    element.addEventListener('keypress', restrictNumeric);
    element.addEventListener('keypress', restrictCardNumber);
    element.addEventListener('keypress', formatNumber);
    element.addEventListener('keydown', formatBackCardNumber);
    element.addEventListener('paste', reFormatCardNumber);
    element.addEventListener('change', reFormatCardNumber);
    element.addEventListener('input', reFormatCardNumber);
}
