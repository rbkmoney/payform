import { FormInfo, FormName } from '../form-info';
import { SlideDirection } from 'checkout/state';

export class PaymentMethodsFormInfo extends FormInfo {

    constructor(active: boolean) {
        super({
            slideDirection: SlideDirection.right,
            height: 100
        });
        this.name = FormName.paymentMethods;
        this.active = active;
    }
}
