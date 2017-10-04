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

function isCustomerBindingStarted(change) {
    return change.changeType === 'CustomerBindingStarted';
}

function isCustomerBindingCreated(change) {
    return change.changeType === 'CustomerBindingStatusChanged' && change.status === 'created';
}

function isCustomerBindingSucceed(change) {
    return change.changeType === 'CustomerBindingStatusChanged' && change.status === 'succeeded';
}

function isCustomerBindingFailed(change) {
    return change.changeType === 'CustomerBindingStatusChanged' && change.status === 'failed';
}

function isCustomerBindingInteractionRequested(change) {
    return change.changeType === 'CustomerBindingInteractionRequested';
}

export {
    isInvoiceUnpaid,
    isInvoicePaid,
    isPaymentCancelled,
    isInvoiceCancelled,
    isPaymentFailed,
    isPaymentProcessed,
    isPaymentInteractionRequested,
    isCustomerBindingStarted,
    isCustomerBindingCreated,
    isCustomerBindingSucceed,
    isCustomerBindingFailed,
    isCustomerBindingInteractionRequested
};
