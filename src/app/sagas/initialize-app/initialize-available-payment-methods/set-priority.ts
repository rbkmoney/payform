import { PaymentMethod, PaymentMethodName } from 'checkout/state';

const paymentMethodPriorityDesc: PaymentMethodName[] = [
    PaymentMethodName.BankCard,
    PaymentMethodName.YandexPay,
    PaymentMethodName.ApplePay,
    PaymentMethodName.DigitalWallet,
    PaymentMethodName.Euroset,
    PaymentMethodName.GooglePay,
    PaymentMethodName.SamsungPay,
    PaymentMethodName.QPS,
    PaymentMethodName.MobileCommerce,
    PaymentMethodName.Uzcard
];

export const setPriority = (methods: PaymentMethod[]): PaymentMethod[] =>
    methods.map((method) => ({
        ...method,
        priority: paymentMethodPriorityDesc.findIndex((m) => m === method.name) + 1
    }));
