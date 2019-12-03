export enum PaymentMethodName {
    'BankCard' = 'BankCard',
    'PaymentTerminal' = 'PaymentTerminal',
    'DigitalWallet' = 'DigitalWallet',
    'MobileCommerce' = 'MobileCommerce'
}

export abstract class PaymentMethod {
    method: PaymentMethodName;
}
