const describedErrors = [
    'InvalidPaymentTool',
    'AccountLimitsExceeded',
    'InsufficientFunds',
    'PreauthorizationFailed',
    'RejectedByIssuer',
    'PaymentRejected',
    '500', '502', '504'
];

export const isHelpAvailable = (errorCode: string): boolean => describedErrors.indexOf(errorCode) > -1;
