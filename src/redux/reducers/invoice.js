import { CREATE_INVOICE } from '../constants/invoice';

export default function (state = null, action) {
    switch (action.type) {
        case CREATE_INVOICE:
            return {
                ...state,
                invoice: action.payload.invoice,
                invoiceAccessToken: action.payload.invoiceAccessToken.payload
            };
    }
    return state;
}