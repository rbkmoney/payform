import * as React from 'react';
import { Euroset } from './euroset';
import { PaymentMethod, PaymentMethodName } from 'checkout/state';
import { Wallets } from './wallets';
import { ApplePay } from './apple-pay';
import { BankCard } from './bank-card';
import { GooglePay } from './google-pay';
import { MethodProps } from './method-props';
import { SamsungPay } from './samsung-pay';
import { QPS } from './qps';
import { MobileCommerce } from './mobile-commerce';
import { Uzcard } from './uzcard';
import { YandexPay } from './yandex-pay';

const Method: React.FC<MethodProps> = (props) => {
    switch (props.method.name) {
        case PaymentMethodName.Euroset:
            return <Euroset {...props} />;
        case PaymentMethodName.Uzcard:
            return <Uzcard {...props} />;
        case PaymentMethodName.QPS:
            return <QPS {...props} />;
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
        case PaymentMethodName.YandexPay:
            return <YandexPay {...props} />;
        case PaymentMethodName.MobileCommerce:
            return <MobileCommerce {...props} />;
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
