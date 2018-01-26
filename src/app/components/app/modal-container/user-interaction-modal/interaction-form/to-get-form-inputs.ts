import { BrowserGetRequest } from 'checkout/backend';
import { deserialize } from 'checkout/utils';

export const createInput = (name: string, value: any): HTMLInputElement => {
    const formParam = document.createElement('input');
    formParam.name = name;
    formParam.value = value;
    return formParam;
};

export const toGetFormInputs = (request: BrowserGetRequest): HTMLInputElement[] => {
    const params = deserialize(request.uriTemplate);
    return Object.keys(params).map((fieldName) => createInput(fieldName, params[fieldName]));
};
