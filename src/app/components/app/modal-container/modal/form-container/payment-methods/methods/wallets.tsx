import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {WalletsIcon} from './icons/wallets-icon';
import { FormInfo, FormName } from 'checkout/state';
import { InitConfig } from 'checkout/config';
import { WalletFormInfo } from 'checkout/state/modal/form-info/wallet-form-info';

interface WalletsProps {
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
    initConfig: InitConfig;
}

const toWallets = (props: WalletsProps) => props.setFormInfo(new WalletFormInfo(FormName.paymentMethods));

export const Wallets: React.SFC<WalletsProps> = (props) => (
    <li className={styles.method} onClick={toWallets.bind(null, props)}>
        <WalletsIcon />
        <div className={styles.title}>
            {props.locale['form.payment.method.name.wallet.label']}
            <hr/>
        </div>
    </li>
);
