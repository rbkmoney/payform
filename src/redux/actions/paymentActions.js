import {
    START,
    FINISH,
    INTERACT_PAYMENT,
    PROCESS_INVOICE_TEMPLATE,
    PROCESS_PAYMENT,
    RESET,
    SET_PAYMENT_ERROR,
    RESUME_PAYMENT
} from '../constants/payment';

function start() {
    return {
        type: START
    };
}

function processPayment() {
    return {
        type: PROCESS_PAYMENT
    };
}

function interactPayment(interactionData) {
    return {
        type: INTERACT_PAYMENT,
        payload: interactionData
    };
}

function resumePayment() {
    return {
        type: RESUME_PAYMENT
    };
}

function processInvoiceTemplate() {
    return {
        type: PROCESS_INVOICE_TEMPLATE
    };
}

function setPaymentError(error) {
    return {
        type: SET_PAYMENT_ERROR,
        payload: error
    };
}

function reset() {
    return {
        type: RESET
    };
}

function finish() {
    return {
        type: FINISH
    };
}

export {
    start,
    processPayment,
    processInvoiceTemplate,
    interactPayment,
    resumePayment,
    setPaymentError,
    reset,
    finish
};
