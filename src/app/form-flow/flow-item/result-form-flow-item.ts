import { FormFlowItem } from './flow-item';
import { InvoiceChange } from 'checkout/backend/model/event/invoice-change';

export class ResultFormFlowItem extends FormFlowItem {
    change: InvoiceChange;
}
