import { ModelState } from 'checkout/state';
import { TypeKeys, InitializeModelCompleted, InvoiceCreated } from 'checkout/actions';

type ModelReducerAction = InitializeModelCompleted | InvoiceCreated;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload
            };
        case TypeKeys.INVOICE_CREATED:
            return {
                ...s,
                invoice: action.payload.invoice,
                invoiceAccessToken: action.payload.invoiceAccessToken
            };
    }
    return s;
}
