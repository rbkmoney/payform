import * as React from 'react';
import * as styles from '../payment-methods.scss';
import { Locale } from 'checkout/locale';
import { CardFormInfo, FormInfo, FormName } from 'checkout/state';
import { BankCardIcon } from './icons/bank-card-icon';

interface BankCardProps {
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
}

const toBankCard = (props: BankCardProps) => props.setFormInfo(new CardFormInfo(FormName.paymentMethods));

export const BankCard: React.SFC<BankCardProps> = (props) => (
    <li className={styles.method} onClick={toBankCard.bind(null, props)}>
        <BankCardIcon/>
        <div className={styles.title}>
            {props.locale['form.payment.method.name.card.label']}
            <hr/>
        </div>
    </li>
);
