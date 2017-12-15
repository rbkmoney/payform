import { Type } from './type';
import { InvoiceChange } from 'checkout/backend';

export interface EventCheckResult {
    type: Type;
    change?: InvoiceChange;
}
