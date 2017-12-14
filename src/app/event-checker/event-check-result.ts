import { Type } from 'checkout/event-checker/type';
import { InvoiceChange } from 'checkout/backend';

export interface EventCheckResult {
    type: Type;
    change?: InvoiceChange;
}
