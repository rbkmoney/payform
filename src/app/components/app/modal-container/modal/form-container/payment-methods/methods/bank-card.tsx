import * as React from 'react';
import * as styles from '../payment-methods.scss';
import {Locale} from 'checkout/locale';
import {FormName, ModelState} from 'checkout/state';
import {InitConfig} from 'checkout/config';
import {BankCardIcon} from './icons/bank-card-icon';

interface BankCardProps {
    locale: Locale;
    setFormInfo: (formName: FormName, initConfig: InitConfig, model: ModelState, previous: FormName) => any;
    initConfig: InitConfig;
    model: ModelState;
}

const toBankCard = (props: BankCardProps) => {
    props.setFormInfo(FormName.cardForm, props.initConfig, props.model, FormName.paymentMethods);
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
