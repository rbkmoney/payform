import { RegisteredField } from 'redux-form';

export type CardFormState = {
    readonly registeredFields: {
        cardNumber: RegisteredField;
        expireDay: RegisteredField;
        secureCode: RegisteredField;
        cardHolder: RegisteredField;
        email: RegisteredField;
    }
    values: {
        cardNumber?: string;
        expireDay?: string;
        secureCode?: string;
        cardHolder?: string;
        email?: string;
    }
}