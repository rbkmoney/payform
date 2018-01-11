import { FormViewInfo } from './form-view-info';

export enum FormName {
    paymentMethods = 'paymentMethods',
    cardForm = 'cardForm',
    resultForm = 'resultForm'
}

export abstract class FormInfo {
    name: FormName;
    viewInfo: FormViewInfo;

    constructor(viewInfo: FormViewInfo) {
        this.viewInfo = viewInfo;
    }
}
