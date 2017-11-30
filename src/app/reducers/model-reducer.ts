import { ModelState } from 'checkout/state';
import { GetInvoiceTemplateAction } from 'checkout/actions/get-invoice-template.action';
import { TypeKeys } from 'checkout/actions';

type ModelReducerAction = GetInvoiceTemplateAction;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.GET_INVOICE_TEMPLATE:
            return {
                ...s,
                invoiceTemplate: action.payload
            };
    }
    return s;
}
