import { Named } from '../named';
import { PaymentStatus } from './payment-status';

export enum FormName {
    paymentMethods = 'paymentMethods',
    paymentMethodsGroup = 'paymentMethodsGroup',
    cardForm = 'cardForm',
    resultForm = 'resultForm',
    walletForm = 'walletForm',
    eurosetForm = 'eurosetForm',
    alipayForm = 'alipayForm',
    interactionForm = 'interactionForm',
    tokenProviderForm = 'tokenProviderForm',
    helpForm = 'helpForm'
}

export abstract class FormInfo implements Named {
    name: FormName;
    active: boolean;
    paymentStatus?: PaymentStatus;

    constructor(public previous?: FormName) {}
}
