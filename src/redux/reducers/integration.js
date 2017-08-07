import { SET_INVOICE } from '../constants/invoice';

export default function (state = null, action) {
    switch (action.type) {
        case SET_INVOICE:
            return {
                ...state,
                invoice: action.payload.invoice
            };
    }
    return state;
}
