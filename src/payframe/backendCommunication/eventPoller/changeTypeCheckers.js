function isInvoiceUnpaid(change) {
    return change.changeType === 'InvoiceCreated' && change.invoice.status === 'unpaid';
}

function isInvoicePaid(change) {
    return change.changeType === 'InvoiceStatusChanged' && change.status === 'paid';
}

function isPaymentCancelled(change) {
    return change.changeType === 'PaymentStatusChanged' && change.status === 'cancelled';
}

function isInvoiceCancelled(change) {
    return change.changeType === 'InvoiceStatusChanged' && change.status === 'cancelled';
}

function isPaymentFailed(change) {
    return change.changeType === 'PaymentStatusChanged' && change.status === 'failed';
}

function isPaymentProcessed(change) {
    return change.changeType === 'PaymentStatusChanged' && change.status === 'processed';
}

function isPaymentInteractionRequested(change) {
    return change.changeType === 'PaymentInteractionRequested';
}

export {
    isInvoiceUnpaid,
    isInvoicePaid,
    isPaymentCancelled,
    isInvoiceCancelled,
    isPaymentFailed,
    isPaymentProcessed,
    isPaymentInteractionRequested
};
