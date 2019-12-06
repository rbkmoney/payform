export enum PaymentMethodName {
    'BankCard' = 'BankCard',
    'PaymentTerminal' = 'PaymentTerminal',
    'DigitalWallet' = 'DigitalWallet',
    'PhoneAccount' = 'PhoneAccount'
}

export abstract class PaymentMethod {
    method: PaymentMethodName;
}
