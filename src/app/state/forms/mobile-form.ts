import { RegisteredField } from 'redux-form';
import { PayableFormValues } from 'checkout/state';

export interface MobileFormFields {
    phone: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}

export interface MobileFormValues extends PayableFormValues {
    phone: string;
}
