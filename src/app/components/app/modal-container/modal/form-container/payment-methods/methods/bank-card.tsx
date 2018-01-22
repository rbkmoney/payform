import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {FormName, ModalForms, ModalName, ModalState, ModelState} from 'checkout/state';
import {InitConfig} from 'checkout/config';
import {BankCardIcon} from './icons/bank-card-icon';
import {findNamed, toActiveFormName} from 'checkout/utils';
import {NavigateDirection} from 'checkout/actions';

interface BankCardProps {
    locale: Locale;
    setFormInfo: (formName: FormName, initConfig: InitConfig, model: ModelState, previous: FormName) => any;
    navigateTo: (formName: FormName, direction: NavigateDirection, previous: FormName) => any;
    initConfig: InitConfig;
    model: ModelState;
    modals: ModalState[];
}

const toBankCard = (props: BankCardProps) => {
    const forms = (findNamed(props.modals, ModalName.modalForms) as ModalForms).formsInfo;
    const isBankCardExist = findNamed(forms, FormName.cardForm);
    isBankCardExist ?
        props.navigateTo(FormName.cardForm, NavigateDirection.forward, toActiveFormName(props.modals))
    :
        props.setFormInfo(FormName.cardForm, props.initConfig, props.model, toActiveFormName(props.modals));
};

export const BankCard: React.SFC<BankCardProps> = (props) => (
    <li className={styles.method} onClick={toBankCard.bind(null, props)}>
        <BankCardIcon />
        <div className={styles.title}>
            {props.locale['form.payment.method.name.card.label']}
            <hr/>
        </div>
    </li>
);
