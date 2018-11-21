import * as React from 'react';
import * as styles from '../form-container.scss';
import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils';
import { Highlight } from 'checkout/components/app/modal-container/modal/form-container/highlight';

export interface AmountInfoProps {
    locale: Locale;
    amount: FormattedAmount;
}

export const AmountInfo: React.SFC<AmountInfoProps> = (props) => (
    <p className={styles.text}>
        {props.locale['form.pay.terminals.instruction.to.pay']}:{' '}
        <Highlight>{`${props.amount.value} ${props.amount.symbol}`}</Highlight>
    </p>
);
