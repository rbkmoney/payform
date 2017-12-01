import { ModelState } from 'checkout/state';
import { TypeKeys, GetInvoiceTemplateAction, GetInvoiceAction } from 'checkout/actions';

type ModelReducerAction = GetInvoiceTemplateAction | GetInvoiceAction;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.GET_INVOICE_TEMPLATE:
            return {
                ...s,
                invoiceTemplate: action.payload
            };
        case TypeKeys.GET_INVOICE:
            return {
                ...s,
                invoice: action.payload
            };
    }
    return s;
}
