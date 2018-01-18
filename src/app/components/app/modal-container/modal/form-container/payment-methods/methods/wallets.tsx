import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {WalletsIcon} from './icons/wallets-icon';

interface EWalletsProps {
    locale: Locale;
}

export const Wallets: React.SFC<EWalletsProps> = (props) => (
    <li className={styles.method}>
        <WalletsIcon />
        <div className={styles.title}>
            {props.locale['form.payment.method.name.ewallet.label']}
            <hr/>
        </div>
    </li>
);
