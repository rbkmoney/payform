import * as React from 'react';
import * as dateFns from 'date-fns';
import * as formStyles from '../../../form-container.scss';
import {
    ListItem,
    NumerableList
} from './numerable-list';
import { PaymentTerminalReceipt } from 'checkout/backend';
import { Locale } from 'checkout/locale';

interface ReceiptInfo {
    locale: Locale;
    receipt: PaymentTerminalReceipt;
    amount: string;
}

const formatPaymentId = (id: string): string => {
    return `${id.slice(0, 2)} ${id.slice(2, 5)} ${id.slice(5, 8)} ${id.slice(8, 10)}`;
};

export const ReceiptInfo: React.SFC<ReceiptInfo> = (props) => (
    <div>
        <p className={formStyles.text}>
            {props.locale['form.pay.terminals.instruction.to.pay']} <span className={formStyles.highlight}>{props.amount}</span>.
            {props.locale['form.pay.terminals.instruction.dueDate']}
            <span
                className={formStyles.highlight}>{dateFns.format(props.receipt.dueDate, 'D.MM.YYYY HH:mm')}</span>.
        </p>

        <NumerableList>
            <ListItem number={1}>
                {props.locale['form.pay.terminals.step.one.text']} {props.locale['brand.euroset']}.
            </ListItem>
            <ListItem number={2}>
                {props.locale['form.pay.terminals.step.two.text']}.
            </ListItem>
            <ListItem number={3}>
                {props.locale['form.pay.terminals.step.three.text']}: <br/>
                <span className={formStyles.highlight}>
                                {formatPaymentId(props.receipt.shortPaymentID)}
                        </span>.
            </ListItem>
            <ListItem number={4}>
                {props.locale['form.pay.terminals.step.four.text']}.
            </ListItem>
            <ListItem number={5}>
                {props.locale['form.pay.terminals.step.five.text']}.
            </ListItem>
        </NumerableList>
    </div>
);
