import {restrictNumeric, } from '../common/restrictNumeric';
import {restrictCardNumber} from './restrictCardNumber';
import {formatNumber} from './formatNumber';
import {formatBackCardNumber} from './formatBackCardNumber';
import {reFormatCardNumber} from './reFormatCardNumber';

export function addCardFormatter(element: Element) {
    element.addEventListener('keypress', restrictNumeric);
    element.addEventListener('keypress', restrictCardNumber);
    element.addEventListener('keypress', formatNumber);
    element.addEventListener('keydown', formatBackCardNumber);
    element.addEventListener('paste', reFormatCardNumber);
    element.addEventListener('change', reFormatCardNumber);
    element.addEventListener('input', reFormatCardNumber);
}
