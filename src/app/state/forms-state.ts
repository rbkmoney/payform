import { CardFormFields, CardFormValues } from './forms/card-form';

interface FormState<T, V> {
    registeredFields: T;
    values?: V;
}

export class FormsState {
    readonly cardForm: FormState<CardFormFields, CardFormValues>;
}
