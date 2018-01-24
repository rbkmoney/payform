import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {WalletsIcon} from './icons/wallets-icon';
import { FormInfo, FormName, WalletFormInfo } from 'checkout/state';

interface WalletsProps {
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
}

const toWallets = (props: WalletsProps) => props.setFormInfo(new WalletFormInfo(FormName.paymentMethods));

export const Wallets: React.SFC<WalletsProps> = (props) => (
    <li className={styles.method} onClick={toWallets.bind(null, props)}>
        <WalletsIcon />
        <div className={styles.text}>
            <h5 className={styles.title}>
                {props.locale['form.payment.method.name.wallet.label']}
                <hr/>
            </h5>
            <p className={styles.description}>
                {props.locale['form.payment.method.description.qiwi.text']}
            </p>
        </div>
    </li>
);
