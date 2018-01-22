import { FormViewInfo } from './form-view-info';
import { PaymentStatus } from './payment-status';
import { Named } from '../named';

export enum FormName {
    paymentMethods = 'paymentMethods',
    cardForm = 'cardForm',
    resultForm = 'resultForm'
}

export abstract class FormInfo implements Named {
    name: FormName;
    active: boolean;
    viewInfo: FormViewInfo;
    paymentStatus?: PaymentStatus;
    previous?: FormName;

    constructor(viewInfo: FormViewInfo, previous: FormName) {
        this.previous = previous;
        this.viewInfo = viewInfo;
    }
}
