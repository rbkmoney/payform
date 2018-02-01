import * as React from 'react';
import * as styles from '../result-form.scss';
import {
    Event,
    PaymentToolDetailsType
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getInvoicePaymentDetails } from './payment-details';

const getPaymentMethodDescription = (l: Locale, e: Event[]): string => {
    const details = getInvoicePaymentDetails(e);
    switch (details.type) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return `${l['form.final.success.card.text']} ${details.info}`;
        case PaymentToolDetailsType.PaymentToolDetailsDigitalWallet:
            return `${l['form.final.success.wallet.text']} ${details.info}`;
        case PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal:
            return `${l['form.final.success.terminal.text']} ${details.info}`;
    }
    throw new Error('Unsupported PaymentToolDetailsType');
};

export const getSuccessDescription = (l: Locale, e: Event[]): JSX.Element => (
    <p className={styles.text}>
        {getPaymentMethodDescription(l, e)}
        <br/>
        {l['form.final.success.check.text']}.
    </p>
);
