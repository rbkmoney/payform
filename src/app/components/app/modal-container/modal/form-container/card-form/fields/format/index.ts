import { addCardFormatter } from './card-number/format-card-number';
import { addExpireDateFormatter } from './expire-date/format-expire-date';
import { addSecureCodeFormatter } from './secure-code/format-secure-code';
import { addCardHolderFormatter } from './card-holder/format-card-holder';

export namespace Formatter {
    export function formatCardNumber(element: Element) { addCardFormatter(element); }

    export function formatExpireDate(element: Element) { addExpireDateFormatter(element); }

    export function formatSecureCode(element: Element) { addSecureCodeFormatter(element); }

    export function formatCardHolder(element: Element) { addCardHolderFormatter(element); }
}
