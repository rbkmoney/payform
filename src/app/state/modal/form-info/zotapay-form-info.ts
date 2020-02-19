import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class ZotapayFormInfo extends FormInfo {
    name = FormName.zotapayForm;
    active = true;
    paymentStatus = PaymentStatus.pristine;
}
