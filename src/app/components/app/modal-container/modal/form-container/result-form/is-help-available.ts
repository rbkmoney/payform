import includes from 'lodash-es/includes';

const describedErrors = [
    'InvalidPaymentTool',
    'AccountLimitsExceeded',
    'InsufficientFunds',
    'PreauthorizationFailed',
    'RejectedByIssuer',
    'PaymentRejected'
];

export const isHelpAvailable = (errorCode: string): boolean => includes(describedErrors, errorCode);
