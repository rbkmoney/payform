import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class UzcardFormInfo extends FormInfo {
    name = FormName.uzcardForm;
    active = true;
    paymentStatus = PaymentStatus.pristine;
}
