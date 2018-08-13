import * as React from 'react';
import * as styles from '../form-container.scss';
import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils';

export interface AmountInfoProps {
    locale: Locale;
    amount: FormattedAmount;
}

export const AmountInfo: React.SFC<AmountInfoProps> = (props) => (
    <p className={styles.text}>
        {props.locale['form.pay.terminals.instruction.to.pay']}:{' '}
        <span className={styles.highlight}>{`${props.amount.value} ${props.amount.symbol}`}</span>
    </p>
);
