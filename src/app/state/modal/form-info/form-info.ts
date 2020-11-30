import { Named } from '../named';
import { PaymentStatus } from './payment-status';

export enum FormName {
    paymentMethods = 'paymentMethods',
    cardForm = 'cardForm',
    resultForm = 'resultForm',
    walletForm = 'walletForm',
    eurosetForm = 'eurosetForm',
    uzcardForm = 'uzcardForm',
    qpsForm = 'qpsForm',
    interactionForm = 'interactionForm',
    tokenProviderForm = 'tokenProviderForm',
    helpForm = 'helpForm',
    mobileCommerceForm = 'mobileCommerceForm',
    mobileCommerceReceiptForm = 'mobileCommerceReceiptForm'
}

export abstract class FormInfo implements Named {
    name: FormName;
    active: boolean;
    paymentStatus?: PaymentStatus;

    constructor(public previous?: FormName) {}
}
