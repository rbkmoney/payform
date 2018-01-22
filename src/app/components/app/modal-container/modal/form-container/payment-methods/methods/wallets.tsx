import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {WalletsIcon} from './icons/wallets-icon';

interface WalletsProps {
    locale: Locale;
}

export const Wallets: React.SFC<WalletsProps> = (props) => (
    <li className={styles.method}>
        <WalletsIcon />
        <div className={styles.title}>
            {props.locale['form.payment.method.name.wallet.label']}
            <hr/>
        </div>
    </li>
);
