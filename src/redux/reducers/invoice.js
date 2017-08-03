import { GET_INVOICE, CREATE_INVOICE } from '../constants/invoice';

export default function (state = null, action) {
    switch (action.type) {
        case GET_INVOICE:
            return action.payload;
        case CREATE_INVOICE:
            break;
    }
    return state;
}