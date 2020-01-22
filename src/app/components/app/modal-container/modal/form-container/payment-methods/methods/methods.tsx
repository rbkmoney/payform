import * as React from 'react';
import { Euroset } from './euroset';
import { PaymentMethod, PaymentMethodName } from 'checkout/state';
import { Wallets } from './wallets';
import { ApplePay } from './apple-pay';
import { BankCard } from './bank-card';
import { GooglePay } from './google-pay';
import { MethodProps } from './method-props';
import { SamsungPay } from './samsung-pay';

export const Methods: React.FC<{ methods: PaymentMethod[]; props: MethodProps }> = ({ methods, props }) => (
    <>
        {methods.map((method) => {
            switch (method.name) {
                case PaymentMethodName.Euroset:
                    return <Euroset key={method.name} {...props} />;
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
                default:
                    return null;
            }
        })}
    </>
);
