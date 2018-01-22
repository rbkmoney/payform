import { FormInfo, FormName } from '../form-info';
import { SlideDirection } from 'checkout/state';

export class PaymentMethodsFormInfo extends FormInfo {

    constructor(active: boolean, height?: number) {
        super({
            slideDirection: SlideDirection.left,
            height: height || 306
        });
        this.name = FormName.paymentMethods;
        this.active = active;
    }
}
