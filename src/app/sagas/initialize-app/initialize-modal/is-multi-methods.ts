import { InitConfig } from 'checkout/config';
import { PaymentMethod, PaymentMethodName } from 'checkout/backend';
import { ModelState } from 'checkout/state';

const checkPaymentMethodsConfig = (c: InitConfig, methods: PaymentMethod[]): boolean => {
    return methods.reduce((acc, current): boolean => {
        switch (current.method) {
            case PaymentMethodName.BankCard:
                return acc;
            case PaymentMethodName.PaymentTerminal:
                return acc || c.terminals;
            case PaymentMethodName.DigitalWallet:
                return acc || c.wallets;
        }
    }, false);
};

export const isMultiMethods = (c: InitConfig, m: ModelState) => m.paymentMethods.length > 1 && checkPaymentMethodsConfig(c, m.paymentMethods);
