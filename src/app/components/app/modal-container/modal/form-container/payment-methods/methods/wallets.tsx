import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {WalletsIcon} from './icons/wallets-icon';
import { NavigateDirection } from 'checkout/actions';
import { FormName, ModalForms, ModalName, ModalState, ModelState } from 'checkout/state';
import { findNamed } from 'checkout/utils';
import { InitConfig } from 'checkout/config';

interface WalletsProps {
    locale: Locale;
    setFormInfo: (formName: FormName, initConfig: InitConfig, model: ModelState, previous: FormName) => any;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
    initConfig: InitConfig;
    model: ModelState;
    modals: ModalState[];
}

const toWallets = (props: WalletsProps) => {
    const forms = (findNamed(props.modals, ModalName.modalForms) as ModalForms).formsInfo;
    const isWalletsExist = findNamed(forms, FormName.walletForm);
    isWalletsExist ?
        props.navigateTo(FormName.walletForm, NavigateDirection.forward)
    :
        props.setFormInfo(FormName.walletForm, props.initConfig, props.model, FormName.paymentMethods);
};

export const Wallets: React.SFC<WalletsProps> = (props) => (
    <li className={styles.method} onClick={toWallets.bind(null, props)}>
        <WalletsIcon />
        <div className={styles.title}>
            {props.locale['form.payment.method.name.wallet.label']}
            <hr/>
        </div>
    </li>
);
