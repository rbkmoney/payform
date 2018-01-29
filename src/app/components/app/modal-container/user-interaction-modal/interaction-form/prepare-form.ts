import { BrowserPostRequest, BrowserRequest, RequestType } from 'checkout/backend';
import { toPostFormInputs } from './to-post-form-inputs';
import { toGetFormInputs } from './to-get-form-inputs';

const toInputs = (origin: string, request: BrowserRequest): HTMLInputElement[] => {
    switch (request.requestType) {
        case RequestType.BrowserPostRequest:
            return toPostFormInputs(origin, (request as BrowserPostRequest).form);
        case RequestType.BrowserGetRequest:
            return toGetFormInputs(origin, request);
    }
};

const toMethod = (request: BrowserRequest): 'POST' | 'GET' => {
    switch (request.requestType) {
        case RequestType.BrowserPostRequest:
            return 'POST';
        case RequestType.BrowserGetRequest:
            return 'GET';
    }
};

export const prepareForm = (origin: string, request: BrowserRequest): HTMLFormElement => {
    const form = document.createElement('form');
    form.action = request.uriTemplate;
    form.method = toMethod(request);
    toInputs(origin, request).forEach((input) => form.appendChild(input));
    form.setAttribute('target', '_self');
    form.style.visibility = 'hidden';
    return form;
};
