import { RegisteredField } from 'redux-form';
import { PayableFormValues } from 'checkout/state';

export interface MobileCommerceFormFields {
    phone: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}

export interface MobileCommerceFormValues extends PayableFormValues {
    phone: string;
}
