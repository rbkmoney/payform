import * as React from 'react';

import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils';
import { Highlight } from 'checkout/components/app/modal-container/modal/form-container/highlight';
import { Text } from '../text';

export interface AmountInfoProps {
    locale: Locale;
    amount: FormattedAmount;
}

export const AmountInfo: React.FC<AmountInfoProps> = (props) => (
    <Text>
        {props.locale['form.pay.terminals.instruction.to.pay']}:{' '}
        <Highlight>{`${props.amount.value} ${props.amount.symbol}`}</Highlight>
    </Text>
);
