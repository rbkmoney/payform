import * as React from 'react';
import { method, text, title, description } from './methods.scss';
import { WalletsIcon } from './icons/wallets-icon';
import { FormName, WalletFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';

const toWallets = (props: MethodProps) => props.setFormInfo(new WalletFormInfo(FormName.paymentMethods));

export const Wallets: React.SFC<MethodProps> = (props) => (
    <li className={method} onClick={toWallets.bind(null, props)} id='wallets-payment-method'>
        <WalletsIcon/>
        <div className={text}>
            <h5 className={title}>
                {props.locale['form.payment.method.name.wallet.label']}
            </h5>
            <p className={description}>
                {props.locale['form.payment.method.description.qiwi.text']}
            </p>
        </div>
    </li>
);
