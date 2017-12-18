import { FormFlowItem } from './flow-item';
import { InvoiceChange } from 'checkout/backend';

export class ResultFormFlowItem extends FormFlowItem {
    change: InvoiceChange;
}
