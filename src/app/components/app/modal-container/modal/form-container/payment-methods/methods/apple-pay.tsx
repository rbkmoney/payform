import * as React from 'react';

import { MethodProps } from './method-props';
import { TokenProviderFormInfo, FormName, PaymentMethodName } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import styled from 'checkout/styled-components';
import { Icon } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/icon/icon';

const toTokenProvider = (props: MethodProps) =>
    props.setFormInfo(new TokenProviderFormInfo(BankCardTokenProvider.applepay, FormName.paymentMethods));

const TokenProviderFormLink: React.SFC<MethodProps> = (props) => (
    <Method onClick={toTokenProvider.bind(null, props)} id="apple-pay-payment-method">
        <Icon name="apple-pay" />
        <Title>{props.locale['form.payment.method.name.apple.pay.label']}</Title>
    </Method>
);

const pay = (props: MethodProps) => props.pay({ method: PaymentMethodName.ApplePay });

export const ApplePayButton = styled((props) => (
    <button type="button" className={props.className} onClick={pay.bind(null, props)} />
))`
    cursor: pointer;
    width: 100%;
    padding: 38px;
    margin-bottom: 10px;
    transition: all 0.3s;
    -webkit-appearance: -apple-pay-button;
    -apple-pay-button-style: white-outline;
`;

export const ApplePay: React.SFC<MethodProps> = (props) => {
    return props.amountPrefilled && props.emailPrefilled ? (
        <ApplePayButton {...props} />
    ) : (
        <TokenProviderFormLink {...props} />
    );
};
