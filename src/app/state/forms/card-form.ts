import { RegisteredField } from 'redux-form';

export interface CardFormFields {
    cardNumber: RegisteredField;
    expireDate: RegisteredField;
    secureCode: RegisteredField;
    cardHolder: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}

export interface CardFormValues {
    cardNumber?: string;
    expireDate?: string;
    secureCode?: string;
    cardHolder?: string;
    email?: string;
    amount?: string;
}
