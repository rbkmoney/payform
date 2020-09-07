import { PaymentMethod, PaymentMethodName } from 'checkout/state';

const paymentMethodPriorityDesc: PaymentMethodName[] = [
    PaymentMethodName.ApplePay,
    PaymentMethodName.BankCard,
    PaymentMethodName.DigitalWallet,
    PaymentMethodName.Euroset,
    PaymentMethodName.GooglePay,
    PaymentMethodName.SamsungPay,
    PaymentMethodName.MobileCommerce,
    PaymentMethodName.QPS
];

export const setPriority = (methods: PaymentMethod[]): PaymentMethod[] =>
    methods.map((method) => ({
        ...method,
        ...(method.children ? { children: setPriority(method.children) } : {}),
        priority: paymentMethodPriorityDesc.findIndex((m) => m === method.name) + 1
    }));
