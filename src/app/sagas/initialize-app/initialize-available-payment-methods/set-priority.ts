import { PaymentMethod, PaymentMethodName, PaymentMethodGroupName } from 'checkout/state';

const paymentMethodPriority: { [N in PaymentMethodName | PaymentMethodGroupName]: number } = {
    [PaymentMethodName.ApplePay]: 1,
    [PaymentMethodName.BankCard]: 2,
    [PaymentMethodName.DigitalWallet]: 3,
    [PaymentMethodGroupName.Terminals]: 4,
    [PaymentMethodName.Euroset]: 5,
    [PaymentMethodName.GooglePay]: 6,
    [PaymentMethodName.SamsungPay]: 7
};

export const setPriority = (methods: PaymentMethod[]): PaymentMethod[] =>
    methods.map((method) => ({
        ...method,
        ...(method.children ? { children: setPriority(method.children) } : {}),
        priority: paymentMethodPriority[method.name]
    }));
