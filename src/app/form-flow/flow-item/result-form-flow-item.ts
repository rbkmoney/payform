import { FormFlowItem } from './flow-item';
import { InvoiceChange, LogicError } from 'checkout/backend';

export enum ResultSubjectType {
    error = 'error',
    invoiceChange = 'invoiceChange'
}

export interface ResultSubject {
    type: ResultSubjectType;
}

export interface ResultSubjectError extends ResultSubject {
    error: LogicError;
}

export interface ResultSubjectInvoiceChange extends ResultSubject {
    change: InvoiceChange;
}

export class ResultFormFlowItem extends FormFlowItem {
    subject: ResultSubject;
}
