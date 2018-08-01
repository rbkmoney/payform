import { FormName, FormInfo } from './form-info';
import { PaymentStatus } from 'checkout/state/modal';
import { BankCardTokenProvider } from 'checkout/backend/model';

export class TokenProviderFormInfo extends FormInfo {
    paymentStatus: PaymentStatus;
    provider: BankCardTokenProvider;

    constructor(provider: BankCardTokenProvider, previous?: FormName) {
        super(previous);
        this.name = FormName.tokenProviderForm;
        this.active = true;
        this.paymentStatus = PaymentStatus.pristine;
        this.provider = provider;
    }
}
