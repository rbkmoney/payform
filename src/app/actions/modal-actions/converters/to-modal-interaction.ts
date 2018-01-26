import {
    BrowserPostRequest,
    Redirect,
    RequestType
} from 'checkout/backend';

export const getRedirect = (redirect: Redirect): BrowserPostRequest => {
    if (redirect.request.requestType === RequestType.BrowserPostRequest) {
        return redirect.request as BrowserPostRequest;
    }
    throw new Error('Unsupported user interaction browser request type');
};
