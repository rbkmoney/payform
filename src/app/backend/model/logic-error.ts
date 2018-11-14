export enum LogicErrorCode {
    operationNotPermitted = 'operationNotPermitted',
    invalidPartyStatus = 'invalidPartyStatus',
    invalidShopStatus = 'invalidShopStatus',
    invalidShopID = 'invalidShopID',
    invalidInvoiceCost = 'invalidInvoiceCost',
    invalidInvoiceCart = 'invalidInvoiceCart',
    invalidInvoiceStatus = 'invalidInvoiceStatus',
    invoicePaymentPending = 'invoicePaymentPending',
    invalidPaymentStatus = 'invalidPaymentStatus',
    invalidPaymentResource = 'invalidPaymentResource',
    invalidPaymentToolToken = 'invalidPaymentToolToken',
    invalidPaymentSession = 'invalidPaymentSession',
    invalidRecurrentParent = 'invalidRecurrentParent',
    insufficentAccountBalance = 'insufficentAccountBalance',
    invoicePaymentAmountExceeded = 'invoicePaymentAmountExceeded',
    inconsistentRefundCurrency = 'inconsistentRefundCurrency',
    changesetConflict = 'changesetConflict',
    invalidChangeset = 'invalidChangeset',
    invalidClaimStatus = 'invalidClaimStatus',
    invalidClaimRevision = 'invalidClaimRevision',
    limitExceeded = 'limitExceeded',
    invalidRequest = 'invalidRequest'
}

export class LogicError {
    code: LogicErrorCode | string;
    message?: string;
}
