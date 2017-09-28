import {
    FINISH,
    INTERACT_PAYMENT,
    INTERACT_TERMINAL_PAYMENT,
    PROCESS_INVOICE_TEMPLATE,
    PROCESS_PAYMENT,
    RESET,
    RESUME_PAYMENT,
    SET_PAYMENT_ERROR,
    START
} from '../constants/payment';

const initialState = {
    status: 'pristine'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case START:
            return {
                ...state,
                status: 'started'
            };
        case PROCESS_PAYMENT:
            return {
                ...state,
                status: 'processPayment'
            };
        case INTERACT_PAYMENT:
            return {
                ...state,
                status: 'interacted',
                interactionData: action.payload
            };
        case INTERACT_TERMINAL_PAYMENT:
            return {
                ...state,
                status: 'interacted',
                interactionData: action.payload
            };
        case RESUME_PAYMENT:
            return {
                ...state,
                status: 'pollEvents'
            };
        case SET_PAYMENT_ERROR:
            return {
                ...state,
                status: 'error',
                paymentError: action.payload
            };
        case RESET:
            return {
                ...state,
                status: 'pristine'
            };
        case FINISH:
            return {
                ...state,
                status: 'finished'
            };
        case PROCESS_INVOICE_TEMPLATE:
            return {
                ...state,
                status: 'processInvoiceTemplate'
            };
    }
    return state;
}
