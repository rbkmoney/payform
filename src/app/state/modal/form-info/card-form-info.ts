import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class CardFormInfo extends FormInfo {
    paymentStatus: PaymentStatus;

    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.cardForm;
        this.active = true;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
