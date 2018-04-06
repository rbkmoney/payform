import * as React from 'react';
import * as styles from '../payment-methods.scss';
import { WalletsIcon } from './icons/wallets-icon';
import { FormName, WalletFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';

const toWallets = (props: MethodProps) => props.setFormInfo(new WalletFormInfo(FormName.paymentMethods));

export const Wallets: React.SFC<MethodProps> = (props) => (
    <li className={styles.method} onClick={toWallets.bind(null, props)} id='wallets-payment-method'>
        <WalletsIcon/>
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
