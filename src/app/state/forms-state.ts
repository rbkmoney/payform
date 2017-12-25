import { CardFormFields, CardFormValues } from './forms/card-form';

interface FormState<T, V> {
    registeredFields: T;
    values?: V;
}

export type CardFormState = FormState<CardFormFields, CardFormValues>;

export class FormsState {
    readonly cardForm: CardFormState;
}
