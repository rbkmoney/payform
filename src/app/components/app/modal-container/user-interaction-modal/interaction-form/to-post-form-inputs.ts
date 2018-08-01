import { FormField } from 'checkout/backend';
import { expandWithRedirect } from './uri-template';

const createInput = (origin: string, formField: FormField): HTMLInputElement => {
    const formParam = document.createElement('input');
    formParam.name = formField.key;
    formField.key === 'TermUrl'
        ? (formParam.value = expandWithRedirect(origin, formField.template))
        : (formParam.value = formField.template);
    return formParam;
};

export const toPostFormInputs = (origin: string, form: FormField[]): HTMLInputElement[] =>
    form.map((field) => createInput(origin, field));
