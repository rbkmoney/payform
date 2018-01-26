import parser from 'uri-template';
import { FormField } from 'checkout/backend';

const prepareTermUri = (origin: string, template: string): string => {
    const decoded = decodeURIComponent(template);
    const parsed = parser.parse(decoded);
    const redirectUrl = `${origin}/html/finishInteraction.html`;
    return parsed.expand({termination_uri: redirectUrl});
};

const createInput = (origin: string, formField: FormField): HTMLInputElement => {
    const formParam = document.createElement('input');
    formParam.name = formField.key;
    formField.key === 'TermUrl'
        ? formParam.value = prepareTermUri(origin, formField.template)
        : formParam.value = formField.template;
    return formParam;
};

export const toPostFormInputs = (origin: string, form: FormField[]): HTMLInputElement[] =>
    form.map((field) => createInput(origin, field));
