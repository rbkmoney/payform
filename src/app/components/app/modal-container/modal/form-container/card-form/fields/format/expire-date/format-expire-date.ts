import { restrictNumeric } from '../common/restrict-numeric';
import { restrictExpiry } from './restrict-expiry';
import { formatExpiry } from './format-expiry';
import { formatForwardSlashAndSpace } from './format-forward-slash-and-space';
import { formatForwardExpiry } from './format-forward-expiry';
import { formatBackExpiry } from './format-back-expiry';
import { reFormatExpiry } from './re-format-expiry';

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
