import { Dispatch } from 'redux';
import { TypeKeys, AbstractAction } from '../';
import { InvoiceTemplate } from 'checkout/backend/model';
import { getInvoiceTemplateByID } from 'checkout/backend/get-invoice-template';

export interface GetInvoiceTemplateAction extends AbstractAction<InvoiceTemplate> {
    type: TypeKeys.GET_INVOICE_TEMPLATE;
    payload: InvoiceTemplate;
}

export type GetInvoiceTemplateDispatch = (dispatch: Dispatch<GetInvoiceTemplateAction>) => void;

export function getInvoiceTemplateAction(capiEndpoint: string, accessToken: string, invoiceTemplateID: string): GetInvoiceTemplateDispatch {
    return (dispatch) => {
        getInvoiceTemplateByID(capiEndpoint, accessToken, invoiceTemplateID).then((invoiceTemplate) => {
            dispatch({
                type: TypeKeys.GET_INVOICE_TEMPLATE,
                payload: invoiceTemplate
            });
        });
    };
}
