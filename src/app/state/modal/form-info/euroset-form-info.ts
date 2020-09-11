import { FormInfo, FormName } from './form-info';
import { PaymentStatus } from './payment-status';

export class EurosetFormInfo extends FormInfo {
    name = FormName.eurosetForm;
    active = true;
    paymentStatus = PaymentStatus.pristine;
}
