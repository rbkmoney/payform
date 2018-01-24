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
    paymentStatus?: PaymentStatus;
    previous?: FormName;

    constructor(previous?: FormName) {
        this.previous = previous;
    }
}
