import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class MobileFormInfo extends FormInfo {
    paymentStatus: PaymentStatus;

    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.mobileForm;
        this.active = true;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
