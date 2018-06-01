import * as React from 'react';
import { PaymentMethodName } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';
import { ApplePayButton } from './apple-pay-button';
import { GooglePayButton } from './google-pay-button';

export const getTitle = (provider: BankCardTokenProvider): string => {
    switch (provider) {
        case BankCardTokenProvider.applepay:
            return 'Apple Pay';
        case BankCardTokenProvider.googlepay:
            return 'Google Pay';
        case BankCardTokenProvider.samsungpay:
            return 'Samsung Pay';
    }
};

export const getPayButton = (provider: BankCardTokenProvider, payHandler: () => void): JSX.Element => {
    switch (provider) {
        case BankCardTokenProvider.applepay:
            return <ApplePayButton onClick={payHandler}/>;
        case BankCardTokenProvider.googlepay:
            return <GooglePayButton onClick={payHandler}/>;
        case BankCardTokenProvider.samsungpay:
            return null;
    }
};

export const getPaymentMethodName = (provider: BankCardTokenProvider): PaymentMethodName => {
    switch (provider) {
        case BankCardTokenProvider.applepay:
            return PaymentMethodName.ApplePay;
        case BankCardTokenProvider.googlepay:
            return PaymentMethodName.GooglePay;
        case BankCardTokenProvider.samsungpay:
            return PaymentMethodName.SamsungPay;
    }
};