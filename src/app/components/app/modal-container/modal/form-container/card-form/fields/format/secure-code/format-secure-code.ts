import { restrictNumeric } from '../common/restrictNumeric';
import { restrictCVC } from './restrictCVC';
import { reFormatCVC } from './reFormatCVC';

export function addSecureCodeFormatter(element: Element) {
    element.addEventListener('keypress', restrictNumeric);
    element.addEventListener('keypress', restrictCVC);
    element.addEventListener('paste', reFormatCVC);
    element.addEventListener('change', reFormatCVC);
    element.addEventListener('input', reFormatCVC);
}
