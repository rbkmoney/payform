import { Named } from '../named';
import { PaymentStatus } from './payment-status';

export enum FormName {
    paymentMethods = 'paymentMethods',
    cardForm = 'cardForm',
    resultForm = 'resultForm',
    walletForm = 'walletForm',
    terminalForm = 'terminalForm',
    interactionForm = 'interactionForm'
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
