import { RegisteredField } from 'redux-form';

export type CardFormFields = {
    cardNumber: RegisteredField;
    expireDay: RegisteredField;
    secureCode: RegisteredField;
    cardHolder: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}

export type CardFormValues = {
    cardNumber?: string;
    expireDay?: string;
    secureCode?: string;
    cardHolder?: string;
    email?: string;
    amount?: number;
}
