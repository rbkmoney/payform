import * as React from 'react';
import { method, title } from './methods.scss';
import { CardFormInfo, FormName } from 'checkout/state';
import { BankCardIcon } from './icons/bank-card-icon';
import { MethodProps } from './method-props';

const toBankCard = (props: MethodProps) => props.setFormInfo(new CardFormInfo(FormName.paymentMethods));

export const BankCard: React.SFC<MethodProps> = (props) => (
    <li className={method} onClick={toBankCard.bind(null, props)} id="bank-card-payment-method">
        <BankCardIcon />
        <div className={title}>{props.locale['form.payment.method.name.card.label']}</div>
    </li>
);
