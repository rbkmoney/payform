import { RegisteredField } from 'redux-form';

export interface WalletFormFields {
    phone: RegisteredField;
    email: RegisteredField;
    amount?: RegisteredField;
}
