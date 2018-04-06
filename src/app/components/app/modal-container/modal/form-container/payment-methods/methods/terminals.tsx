import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {TerminalsIcon} from './icons/terminals-icon';
import { FormName, TerminalFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';

const toTerminals = (props: MethodProps) => props.setFormInfo(new TerminalFormInfo(FormName.paymentMethods));

export const Terminals: React.SFC<MethodProps> = (props) => (
    <li className={styles.method} onClick={toTerminals.bind(null, props)} id='terminal-payment-method'>
        <TerminalsIcon />
        <div className={styles.text}>
            <h5 className={styles.title}>
                {props.locale['form.payment.method.name.cash.label']}
                <hr/>
            </h5>
            <p className={styles.description}>
                {props.locale['form.payment.method.description.euroset.text']}
            </p>
        </div>
    </li>
);
