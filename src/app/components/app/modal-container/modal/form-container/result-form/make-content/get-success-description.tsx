import * as React from 'react';
import {
    PayerType,
    PaymentResourcePayer,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsType
} from 'checkout/backend';
import { ModelState } from 'checkout/state';
import { Locale } from 'checkout/locale';
import * as styles from '../result-form.scss';

const getCardMaskFromPayer = (payer: PaymentResourcePayer): string => {
    const details = payer.paymentToolDetails;
    switch (details.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return (details as PaymentToolDetailsBankCard).cardNumberMask;
    }
    return null;
};

const getCardMask = (m: ModelState): string => {
    const payer = m.payment.payer;
    switch (payer.payerType) {
        case PayerType.PaymentResourcePayer:
            return getCardMaskFromPayer(payer as PaymentResourcePayer);
    }
    return null;
};

export const getSuccessDescription = (l: Locale, m: ModelState): JSX.Element => (
    m.payment ?
        <p className={styles.text}>
            {l['form.final.success.card.text']} *{getCardMask(m)}.
            <br/>
            {l['form.final.success.check.text']}.
        </p> : null
);
