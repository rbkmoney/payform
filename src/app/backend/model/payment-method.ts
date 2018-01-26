export enum PaymentMethodName {
    'BankCard' = 'BankCard',
    'PaymentTerminal' = 'PaymentTerminal',
    'DigitalWallet' = 'DigitalWallet'
}

export abstract class PaymentMethod {
    method: PaymentMethodName;
}
