import { BrowserGetRequest } from 'checkout/backend';
import { getUrlParams } from 'checkout/utils';
import { expandWithRedirect, hasTerminationUriTemplate } from './uri-template';

const createInput = (name: string, value: any): HTMLInputElement => {
    const formParam = document.createElement('input');
    formParam.name = name;
    formParam.value = value;
    return formParam;
};

export const toGetFormInputs = (origin: string, request: BrowserGetRequest): HTMLInputElement[] => {
    const params = getUrlParams(request.uriTemplate);
    return Object.keys(params).map((fieldName) => {
        const value = params[fieldName];
        return hasTerminationUriTemplate(value)
            ? createInput(fieldName, expandWithRedirect(origin, value, true))
            : createInput(fieldName, value);
    });
};
