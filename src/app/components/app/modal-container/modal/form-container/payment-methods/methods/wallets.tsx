import * as React from 'react';
import { text } from './methods.scss';
import { WalletsIcon } from './icons/wallets-icon';
import { FormName, WalletFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import {
    Method,
    Title
} from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';

const toWallets = (props: MethodProps) => props.setFormInfo(new WalletFormInfo(FormName.paymentMethods));

export const Wallets: React.SFC<MethodProps> = (props) => (
    <Method onClick={toWallets.bind(null, props)} id="wallets-payment-method">
        <WalletsIcon />
        <div className={text}>
            <Title>{props.locale['form.payment.method.name.wallet.label']}</Title>
            <Description>{props.locale['form.payment.method.description.qiwi.text']}</Description>
        </div>
    </Method>
);
