import { restrictNumeric } from '../common/restrict-numeric';
import { restrictCVC } from './restrict-code';
import { reFormatCVC } from './re-format-code';

export function secureCodeFormatter(element: Element) {
    element.addEventListener('keypress', restrictNumeric);
    element.addEventListener('keypress', restrictCVC);
    element.addEventListener('paste', reFormatCVC);
    element.addEventListener('change', reFormatCVC);
    element.addEventListener('input', reFormatCVC);
}
