import { RegisteredField } from 'redux-form';
import { PayableFormValues } from 'checkout/state';

export interface TerminalFormFields {
    email: RegisteredField;
    amount?: RegisteredField;
}

export interface TerminalFormValues extends PayableFormValues {}
