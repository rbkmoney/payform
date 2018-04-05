import * as React from 'react';
import { method_center } from '../payment-methods.scss';
import { ApplePayIcon } from './icons/apple-pay-icon';

export const ApplePay: React.SFC = () => (
    <li className={method_center} id='apple-pay-payment-method'>
        <ApplePayIcon/>
    </li>
);
