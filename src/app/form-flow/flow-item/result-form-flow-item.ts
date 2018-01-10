import { FormFlowItem } from './flow-item';
import { InvoiceChange, LogicError } from 'checkout/backend';
import { FormName } from 'checkout/form-flow/form-name';

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

    constructor(props: ResultFormFlowItem) {
        super();

        this.formName = FormName.resultForm;
        this.active = props.active;
        this.status = props.status;
        this.view = props.view;
        this.subject = props.subject;
        this.handledEventID = props.handledEventID;
    }
}
