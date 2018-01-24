import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {TerminalsIcon} from './icons/terminals-icon';

interface TerminalsProps {
    locale: Locale;
}

export const Terminals: React.SFC<TerminalsProps> = (props) => (
    <li className={styles.method}>
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
