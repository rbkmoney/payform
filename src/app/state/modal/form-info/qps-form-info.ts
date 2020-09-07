import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class QPSFormInfo extends FormInfo {
    name = FormName.qpsForm;
    active = true;
    paymentStatus = PaymentStatus.pristine;
}
