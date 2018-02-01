import { Locale } from 'checkout/locale';
import { failed } from './make-from-payment-change';
import { LogicError } from 'checkout/backend';
import { ResultFormContent } from './result-form-content';

export const makeContentError = (l: Locale, error: LogicError): ResultFormContent => failed(l, error);
