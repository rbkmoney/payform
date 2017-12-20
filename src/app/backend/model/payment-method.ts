export enum PaymentMethodsNames {
    BankCard = 'BankCard',
    PaymentTerminal = 'PaymentTerminal',
    DigitalWallet = 'DigitalWallet'
}

export abstract class PaymentMethod {
    method: PaymentMethodsNames;
}
