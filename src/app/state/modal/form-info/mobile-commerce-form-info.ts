import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class MobileCommerceFormInfo extends FormInfo {
    paymentStatus: PaymentStatus;

    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.mobileCommerceForm;
        this.active = true;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
