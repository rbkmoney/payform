import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class TerminalFormInfo extends FormInfo {

    paymentStatus: PaymentStatus;

    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.terminalForm;
        this.active = true;
        this.paymentStatus = PaymentStatus.pristine;
    }
}
