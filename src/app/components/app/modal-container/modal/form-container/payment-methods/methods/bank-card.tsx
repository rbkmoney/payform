import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {FormName, ModalForms, ModalName, ModalState, ModelState} from 'checkout/state';
import {InitConfig} from 'checkout/config';
import {BankCardIcon} from './icons/bank-card-icon';
import {findNamed} from 'checkout/utils';

interface BankCardProps {
    locale: Locale;
    setFormInfo: (formName: FormName, initConfig: InitConfig, model: ModelState) => any;
    setActiveFormInfo: (formName: FormName, modals: ModalState[]) => any;
    initConfig: InitConfig;
    model: ModelState;
    modals: ModalState[];
}

const toBankCard = (props: BankCardProps) => {
    const forms = (findNamed(props.modals, ModalName.modalForms) as ModalForms).formsInfo;
    const isBankCardExist = findNamed(forms, FormName.cardForm);
    isBankCardExist ?
        props.setActiveFormInfo(FormName.cardForm, props.modals)
    :
        props.setFormInfo(FormName.cardForm, props.initConfig, props.model);
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
