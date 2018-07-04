import includes from 'lodash-es/includes';

const describedErrors = [
    'InvalidPaymentTool',
    'AccountLimitsExceeded',
    'InsufficientFunds',
    'PreauthorizationFailed',
    'RejectedByIssuer',
    'PaymentRejected',
    '500', '502', '504'
];

export const isHelpAvailable = (errorCode: string): boolean => includes(describedErrors, errorCode);
