import * as React from 'react';
import { apple_pay_button } from './methods.scss';
import { ApplePayIcon } from './icons/apple-pay-icon';
import { MethodProps } from './method-props';
import { TokenProviderFormInfo, FormName, PaymentMethodName } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';
import {
    Method,
    Title
} from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';

const toTokenProvider = (props: MethodProps) =>
    props.setFormInfo(new TokenProviderFormInfo(BankCardTokenProvider.applepay, FormName.paymentMethods));

const TokenProviderFormLink: React.SFC<MethodProps> = (props) => (
    <Method onClick={toTokenProvider.bind(null, props)} id="apple-pay-payment-method">
        <ApplePayIcon />
        <Title>{props.locale['form.payment.method.name.apple.pay.label']}</Title>
    </Method>
);

const pay = (props: MethodProps) => props.pay({ method: PaymentMethodName.ApplePay });

const ApplePayButton: React.SFC<MethodProps> = (props) => (
    <button type="button" className={apple_pay_button} onClick={pay.bind(null, props)} />
);

export const ApplePay: React.SFC<MethodProps> = (props) => {
    return props.amountPrefilled && props.emailPrefilled ? (
        <ApplePayButton {...props} />
    ) : (
        <TokenProviderFormLink {...props} />
    );
};
