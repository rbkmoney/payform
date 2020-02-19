import * as React from 'react';
import { Euroset } from './euroset';
import { PaymentMethod, PaymentMethodName, PaymentMethodGroupName } from 'checkout/state';
import { Wallets } from './wallets';
import { ApplePay } from './apple-pay';
import { BankCard } from './bank-card';
import { GooglePay } from './google-pay';
import { MethodProps } from './method-props';
import { SamsungPay } from './samsung-pay';
import { Terminals } from './terminals';
import { Zotapay } from './zotapay';

const Method: React.FC<MethodProps> = (props) => {
    switch (props.method.name) {
        case PaymentMethodName.Euroset:
            return <Euroset {...props} />;
        case PaymentMethodName.ZotaPay:
            return <Zotapay {...props} />;
        case PaymentMethodName.DigitalWallet:
            return <Wallets {...props} />;
        case PaymentMethodName.BankCard:
            return <BankCard {...props} />;
        case PaymentMethodName.ApplePay:
            return <ApplePay {...props} />;
        case PaymentMethodName.GooglePay:
            return <GooglePay {...props} />;
        case PaymentMethodName.SamsungPay:
            return <SamsungPay {...props} />;
        case PaymentMethodGroupName.Terminals:
            return <Terminals {...props} />;
        default:
            return null;
    }
};

export const Methods: React.FC<{ methods: PaymentMethod[]; props: Omit<MethodProps, 'method'> }> = ({
    methods,
    props
}) => (
    <>
        {methods.map((method) => (
            <Method key={method.name} method={method} {...props} />
        ))}
    </>
);
