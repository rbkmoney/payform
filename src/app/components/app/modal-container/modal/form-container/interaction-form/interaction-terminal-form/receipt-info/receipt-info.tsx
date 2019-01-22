import * as React from 'react';
import * as format from 'date-fns/format';

import { PaymentTerminalReceipt } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { FormattedAmount } from 'checkout/utils';
import { Highlight } from 'checkout/components/app/modal-container/modal/form-container/highlight';
import { ListItem, NumerableList } from 'checkout/components/app/modal-container/modal/form-container/numerable-list';
import { Text } from '../../../text';

interface ReceiptInfo {
    locale: Locale;
    receipt: PaymentTerminalReceipt;
    amount: FormattedAmount;
}

const formatPaymentId = (id: string): string =>
    `${id.slice(0, 2)} ${id.slice(2, 5)} ${id.slice(5, 8)} ${id.slice(8, 10)}`;

const Instruction: React.FC<ReceiptInfo> = (props) => {
    const formattedDate = format(props.receipt.dueDate, 'D.MM.YYYY HH:mm');
    const amount = `${props.amount.value} ${props.amount.symbol}`;
    return (
        <Text>
            {props.locale['form.pay.terminals.instruction.to.pay']} <Highlight>{amount}</Highlight>.
            {props.locale['form.pay.terminals.instruction.dueDate']} <Highlight>{formattedDate}</Highlight>.
        </Text>
    );
};

export const ReceiptInfo: React.FC<ReceiptInfo> = (props) => (
    <div>
        <Instruction {...props} />
        <NumerableList>
            <ListItem number={1}>
                {props.locale['form.pay.terminals.step.one.text']} {props.locale['brand.euroset']}.
            </ListItem>
            <ListItem number={2}>{props.locale['form.pay.terminals.step.two.text']}.</ListItem>
            <ListItem number={3}>
                {props.locale['form.pay.terminals.step.three.text']}: <br />
                <Highlight>{formatPaymentId(props.receipt.shortPaymentID)}</Highlight>.
            </ListItem>
            <ListItem number={4}>{props.locale['form.pay.terminals.step.four.text']}.</ListItem>
            <ListItem number={5}>{props.locale['form.pay.terminals.step.five.text']}.</ListItem>
        </NumerableList>
    </div>
);
