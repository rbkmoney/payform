import { FormViewInfo } from './form-view-info';
import { Named } from '../named';
import { PaymentStatus } from './payment-status';

export enum FormName {
    paymentMethods = 'paymentMethods',
    cardForm = 'cardForm',
    resultForm = 'resultForm'
}

export abstract class FormInfo implements Named {
    name: FormName;
    viewInfo: FormViewInfo;
    active: boolean;
    paymentStatus?: PaymentStatus;

    constructor(viewInfo: FormViewInfo) {
        this.viewInfo = viewInfo;
    }
}
