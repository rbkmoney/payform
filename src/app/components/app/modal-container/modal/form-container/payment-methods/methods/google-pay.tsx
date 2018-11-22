import * as React from 'react';
import { MethodProps } from './method-props';
import { GooglePayIcon } from './icons/google-pay-icon';
import { FormName, PaymentMethodName, TokenProviderFormInfo } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';
import { MethodSimple } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/mthod-simple';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';

const toTokenProvider = (props: MethodProps) =>
    props.setFormInfo(new TokenProviderFormInfo(BankCardTokenProvider.googlepay, FormName.paymentMethods));

const TokenProviderFormLink: React.SFC<MethodProps> = (props) => (
    <Method onClick={toTokenProvider.bind(null, props)} id="google-pay-payment-method">
        <GooglePayIcon />
        <Title>{props.locale['form.payment.method.name.google.pay.label']}</Title>
    </Method>
);

const pay = (props: MethodProps) => props.pay({ method: PaymentMethodName.GooglePay });

const GooglePayLink: React.SFC<MethodProps> = (props) => (
    <MethodSimple onClick={pay.bind(null, props)} id="google-pay-payment-method">
        <svg viewBox="0 -20 435 195" width="100%" height="40">
            <g fill="none">
                <path
                    d="M206.2 82.58v50.75h-16.1V8h42.7a38.61 38.61 0 0 1 27.65 10.85A34.88 34.88 0 0 1 272 45.3a34.72 34.72 0 0 1-11.55 26.6c-7.47 7.12-16.68 10.68-27.65 10.67h-26.6v.01zm0-59.15v43.75h27a21.28 21.28 0 0 0 15.93-6.48 21.36 21.36 0 0 0 0-30.63 21 21 0 0 0-15.93-6.65h-27v.01zm102.9 21.35c11.9 0 21.3 3.18 28.18 9.54 6.89 6.36 10.33 15.08 10.32 26.16v52.85h-15.4v-11.9h-.7c-6.67 9.8-15.53 14.7-26.6 14.7-9.45 0-17.35-2.8-23.71-8.4a26.82 26.82 0 0 1-9.54-21c0-8.87 3.35-15.93 10.06-21.17 6.7-5.24 15.66-7.87 26.86-7.88 9.56 0 17.43 1.75 23.62 5.25v-3.68A18.33 18.33 0 0 0 325.54 65 22.8 22.8 0 0 0 310 59.13c-9 0-16.11 3.8-21.35 11.38l-14.18-8.93c7.8-11.2 19.34-16.8 34.63-16.8zm-20.83 62.3a12.86 12.86 0 0 0 5.34 10.5 19.64 19.64 0 0 0 12.51 4.2 25.67 25.67 0 0 0 18.11-7.52c5.33-5.02 8-10.91 8-17.67-5.02-4-12.02-6-21-6-6.54 0-12 1.58-16.36 4.73-4.41 3.2-6.6 7.09-6.6 11.76zM436 47.58l-53.76 123.55h-16.62l19.95-43.23-35.35-80.32h17.5l25.55 61.6h.35l24.85-61.6z"
                    fill="#5F6368"
                />
                <path
                    d="M141.14 71.64A85.79 85.79 0 0 0 139.9 57H72v27.73h38.89a33.33 33.33 0 0 1-14.38 21.88v18h23.21c13.59-12.53 21.42-31.06 21.42-52.97z"
                    fill="#4285F4"
                />
                <path
                    d="M72 142c19.43 0 35.79-6.38 47.72-17.38l-23.21-18C90.05 111 81.73 113.5 72 113.5c-18.78 0-34.72-12.66-40.42-29.72H7.67v18.55A72 72 0 0 0 72 142z"
                    fill="#34A853"
                />
                <path
                    d="M31.58 83.78a43.14 43.14 0 0 1 0-27.56V37.67H7.67a72 72 0 0 0 0 64.66l23.91-18.55z"
                    fill="#FBBC04"
                />
                <path
                    d="M72 28.5a39.09 39.09 0 0 1 27.62 10.8l20.55-20.55A69.18 69.18 0 0 0 72 0 72 72 0 0 0 7.67 39.67l23.91 18.55C37.28 41.16 53.22 28.5 72 28.5z"
                    fill="#EA4335"
                />
            </g>
        </svg>
    </MethodSimple>
);

export const GooglePay: React.SFC<MethodProps> = (props) => {
    return props.amountPrefilled && props.emailPrefilled ? (
        <GooglePayLink {...props} />
    ) : (
        <TokenProviderFormLink {...props} />
    );
};
