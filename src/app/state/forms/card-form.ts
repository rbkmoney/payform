import { RegisteredField } from 'redux-form';
import { PayableFormValues } from './payable-form-values';

export interface CardFormFields {
    cardNumber: RegisteredField;
    expireDate: RegisteredField;
    secureCode: RegisteredField;
    cardHolder: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}

export interface CardFormValues extends PayableFormValues {
    cardNumber?: string;
    expireDate?: string;
    secureCode?: string;
    cardHolder?: string;
}
