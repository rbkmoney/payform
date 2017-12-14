import { AbstractAction, TypeKeys } from 'checkout/actions';

export interface SetInvoiceAccessToken extends AbstractAction<string> {
    type: TypeKeys.SET_INVOICE_ACCESS_TOKEN;
    payload: string;
}

export const setInvoiceAccessToken = (token: string) => ({
    type: TypeKeys.SET_INVOICE_ACCESS_TOKEN,
    payload: token
});
