import * as React from 'react';
import {
    Event,
    PayerType,
    PaymentResourcePayer,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsType,
    PaymentStarted
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import * as styles from '../result-form.scss';
import { findChange } from 'checkout/utils';
import { ChangeType } from 'checkout/backend/model/event/change-type';

const getCardMaskFromPayer = (payer: PaymentResourcePayer): string => {
    const details = payer.paymentToolDetails;
    switch (details.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return (details as PaymentToolDetailsBankCard).cardNumberMask;
    }
    return null;
};

const getCardMask = (e: Event[]): string => {
    const change = findChange(e, ChangeType.PaymentStarted) as PaymentStarted;
    const payer = change.payment.payer;
    switch (payer.payerType) {
        case PayerType.PaymentResourcePayer:
            return getCardMaskFromPayer(payer as PaymentResourcePayer);
    }
    return null;
};

export const getSuccessDescription = (l: Locale, e: Event[]): JSX.Element => (
    <p className={styles.text}>
        {l['form.final.success.card.text']} *{getCardMask(e)}.
        <br/>
        {l['form.final.success.check.text']}.
    </p>
);
