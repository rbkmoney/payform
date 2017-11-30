import { restrictNumeric } from '../common/restrictNumeric';
import { restrictExpiry } from './restrictExpiry';
import { formatExpiry } from './formatExpiry';
import { formatForwardSlashAndSpace } from './formatForwardSlashAndSpace';
import { formatForwardExpiry } from './formatForwardExpiry';
import { formatBackExpiry } from './formatBackExpiry';
import { reFormatExpiry } from './reFormatExpiry';

export function addExpireDateFormatter(element: Element) {
    element.addEventListener('keypress', restrictNumeric);
    element.addEventListener('keypress', restrictExpiry);
    element.addEventListener('keypress', formatExpiry);
    element.addEventListener('keypress', formatForwardSlashAndSpace);
    element.addEventListener('keypress', formatForwardExpiry);
    element.addEventListener('keydown', formatBackExpiry);
    element.addEventListener('change', reFormatExpiry);
    element.addEventListener('input', reFormatExpiry);
}
