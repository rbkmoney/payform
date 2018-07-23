import * as React from 'react';
import { method, text, title, description } from './methods.scss';
import { TerminalsIcon } from './icons/terminals-icon';
import { FormName, TerminalFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';

const toTerminals = (props: MethodProps) => props.setFormInfo(new TerminalFormInfo(FormName.paymentMethods));

export const Terminals: React.SFC<MethodProps> = (props) => (
    <li className={method} onClick={toTerminals.bind(null, props)} id='terminal-payment-method'>
        <TerminalsIcon/>
        <div className={text}>
            <h5 className={title}>
                {props.locale['form.payment.method.name.cash.label']}
            </h5>
            <p className={description}>
                {props.locale['form.payment.method.description.euroset.text']}
            </p>
        </div>
    </li>
);
