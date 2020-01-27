import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class AlipayFormInfo extends FormInfo {
    name = FormName.alipayForm;
    active = true;
    paymentStatus = PaymentStatus.pristine;
}
