import { FormInfo, FormName } from '../form-info';

export class PaymentMethodsFormInfo extends FormInfo {
    constructor() {
        super();
        this.name = FormName.paymentMethods;
        this.active = true;
    }
}
