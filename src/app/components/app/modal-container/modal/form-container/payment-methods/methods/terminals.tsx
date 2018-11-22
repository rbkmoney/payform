import * as React from 'react';
import { text } from './methods.scss';
import { TerminalsIcon } from './icons/terminals-icon';
import { FormName, TerminalFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import {
    Method,
    Title
} from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';

const toTerminals = (props: MethodProps) => props.setFormInfo(new TerminalFormInfo(FormName.paymentMethods));

export const Terminals: React.SFC<MethodProps> = (props) => (
    <Method onClick={toTerminals.bind(null, props)} id="terminal-payment-method">
        <TerminalsIcon />
        <div className={text}>
            <Title>{props.locale['form.payment.method.name.cash.label']}</Title>
            <Description>{props.locale['form.payment.method.description.euroset.text']}</Description>
        </div>
    </Method>
);
