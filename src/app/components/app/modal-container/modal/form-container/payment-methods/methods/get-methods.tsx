import * as React from 'react';
import { Terminals } from './terminals';
import { PaymentMethod, PaymentMethodName } from 'checkout/state';
import { Wallets } from './wallets';
import { ApplePay } from './apple-pay';
import { BankCard } from './bank-card';
import { GooglePay } from './google-pay';
import { MethodProps } from './method-props';
import { SamsungPay } from './samsung-pay';
import { MobileCommerce } from './mobile-commerce';

export const getMethods = (methods: PaymentMethod[], props: MethodProps): JSX.Element[] =>
    methods.map((method) => {
        switch (method.name) {
            case PaymentMethodName.PaymentTerminal:
                return <Terminals key={method.name} {...props} />;
            case PaymentMethodName.DigitalWallet:
                return <Wallets key={method.name} {...props} />;
            case PaymentMethodName.BankCard:
                return <BankCard key={method.name} {...props} />;
            case PaymentMethodName.ApplePay:
                return <ApplePay key={method.name} {...props} />;
            case PaymentMethodName.GooglePay:
                return <GooglePay key={method.name} {...props} />;
            case PaymentMethodName.SamsungPay:
                return <SamsungPay key={method.name} {...props} />;
            case PaymentMethodName.MobileCommerce:
                return <MobileCommerce key={method.name} {...props} />;
            default:
                return null;
        }
    });
