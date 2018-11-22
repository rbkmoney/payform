import * as React from 'react';

import { WalletsIcon } from './icons/wallets-icon';
import { FormName, WalletFormInfo } from 'checkout/state';
import { MethodProps } from './method-props';
import { Description } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/description';
import { Method } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/method';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/title';
import { Text } from 'checkout/components/app/modal-container/modal/form-container/payment-methods/methods/text';

const toWallets = (props: MethodProps) => props.setFormInfo(new WalletFormInfo(FormName.paymentMethods));

export const Wallets: React.SFC<MethodProps> = (props) => (
    <Method onClick={toWallets.bind(null, props)} id="wallets-payment-method">
        <WalletsIcon />
        <Text>
            <Title>{props.locale['form.payment.method.name.wallet.label']}</Title>
            <Description>{props.locale['form.payment.method.description.qiwi.text']}</Description>
        </Text>
    </Method>
);
