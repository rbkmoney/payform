import { GET_INVOICE_TEMPLATE } from '../constants/invoiceTemplate';

export default function (state = null, action) {
    switch (action.type) {
        case GET_INVOICE_TEMPLATE:
            return action.payload;
    }
    return state;
}
