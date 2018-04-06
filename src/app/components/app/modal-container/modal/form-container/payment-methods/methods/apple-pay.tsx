import * as React from 'react';
import { method_center } from '../payment-methods.scss';
import { ApplePayIcon } from './icons/apple-pay-icon';
import { MethodProps } from './method-props';
import { TokenProviderFormInfo, FormName } from 'checkout/state';
import { BankCardTokenProvider } from 'checkout/backend/model';

const toTokenProvider = (props: MethodProps) =>
    props.setFormInfo(new TokenProviderFormInfo(BankCardTokenProvider.applepay, FormName.paymentMethods));

export const ApplePay: React.SFC<MethodProps> = (props) => (
    <li className={method_center} onClick={toTokenProvider.bind(null, props)} id='apple-pay-payment-method'>
        <ApplePayIcon/>
    </li>
);
