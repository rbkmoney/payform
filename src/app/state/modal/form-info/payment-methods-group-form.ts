import { FormInfo, FormName } from '.';
import { PaymentMethodGroupName } from '../../payment-method';

export class PaymentMethodsGroupForm extends FormInfo {
    name = FormName.paymentMethodsGroup;
    active = true;

    constructor(public group: PaymentMethodGroupName, previous?: FormName) {
        super(previous);
    }
}
