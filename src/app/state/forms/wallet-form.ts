import { RegisteredField } from 'redux-form';
import { PayableFormValues } from 'checkout/state';

export interface WalletFormFields {
    phone: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}


export interface WalletFormValues extends PayableFormValues {
    phone: string;
}
