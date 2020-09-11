import { PaymentMethod, PaymentMethodName } from 'checkout/state';

const paymentMethodPriorityDesc: PaymentMethodName[] = [
    PaymentMethodName.ApplePay,
    PaymentMethodName.BankCard,
    PaymentMethodName.DigitalWallet,
    PaymentMethodName.Euroset,
    PaymentMethodName.GooglePay,
    PaymentMethodName.SamsungPay,
    PaymentMethodName.QPS,
    PaymentMethodName.MobileCommerce
];

export const setPriority = (methods: PaymentMethod[]): PaymentMethod[] =>
    methods.map((method) => ({
        ...method,
        priority: paymentMethodPriorityDesc.findIndex((m) => m === method.name) + 1
    }));
