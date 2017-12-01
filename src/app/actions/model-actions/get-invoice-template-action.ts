import { Dispatch } from 'redux';
import { TypeKeys, AbstractAction, SetErrorAction } from '../';
import { InvoiceTemplate } from 'checkout/backend/model';
import { getInvoiceTemplateByID } from 'checkout/backend/get-invoice-template';

export interface GetInvoiceTemplateAction extends AbstractAction<InvoiceTemplate> {
    type: TypeKeys.GET_INVOICE_TEMPLATE;
    payload: InvoiceTemplate;
}

export type GetInvoiceTemplateDispatch = (dispatch: Dispatch<GetInvoiceTemplateAction | SetErrorAction>) => void;

export function getInvoiceTemplateAction(capiEndpoint: string, accessToken: string, invoiceTemplateID: string): GetInvoiceTemplateDispatch {
    return (dispatch) =>
        getInvoiceTemplateByID(capiEndpoint, accessToken, invoiceTemplateID)
            .then((invoiceTemplate) => dispatch({
                type: TypeKeys.GET_INVOICE_TEMPLATE,
                payload: invoiceTemplate
            }))
            .catch((error) => dispatch({
                type: TypeKeys.SET_ERROR,
                payload: error // TODO check 500 errors
            }));
}
