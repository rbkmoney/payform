import * as React from 'react';
import * as styles from '../result-form.scss';
import {
    Event,
    PayerType,
    PaymentResourcePayer,
    PaymentToolDetailsBankCard,
    PaymentToolDetailsType,
    PaymentStarted,
    ChangeType,
    PaymentToolDetails
} from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { findChange } from 'checkout/utils';
import {
    PaymentToolDetailsDigitalWallet,
    PaymentToolDetailsPaymentTerminal,
    DigitalWalletDetailsType,
    DigitalWalletDetailsQiwi
} from 'checkout/backend/model';

const toCardDescription = (details: PaymentToolDetailsBankCard): string => `*${details.cardNumberMask}`;

const toDigitalWalletQiwi = (details: DigitalWalletDetailsQiwi): string => `qiwi ${details.phoneNumberMask}`;

const toTerminalDescription = (details: PaymentToolDetailsPaymentTerminal, l: Locale): string => {
    const localeKey = `brand.${details.provider}`;
    return `${l[localeKey]}`;
};

const toDigitalWallet = (details: PaymentToolDetailsDigitalWallet): string => {
    switch (details.digitalWalletDetailsType) {
        case DigitalWalletDetailsType.DigitalWalletDetailsQIWI:
            return toDigitalWalletQiwi(details as any); // mixin cast problem
    }
    throw new Error('Unsupported DigitalWalletDetailsType');
};

const toDetailsDescription = (details: PaymentToolDetails, locale: Locale): string => {
    switch (details.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return toCardDescription(details as PaymentToolDetailsBankCard);
        case PaymentToolDetailsType.PaymentToolDetailsDigitalWallet:
            return toDigitalWallet(details as PaymentToolDetailsDigitalWallet);
        case PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal:
            return toTerminalDescription(details as PaymentToolDetailsPaymentTerminal, locale)
    }
    throw new Error('Unsupported PaymentToolDetailsType');
};

const getPaymentToolDetails = (e: Event[]): PaymentToolDetails => {
    const change = findChange(e, ChangeType.PaymentStarted) as PaymentStarted;
    const payer = change.payment.payer;
    switch (payer.payerType) {
        case PayerType.PaymentResourcePayer:
            return (payer as PaymentResourcePayer).paymentToolDetails;
        case PayerType.CustomerPayer:
            throw new Error('Unsupported CustomerPayer');
    }
    throw new Error('Unsupported PayerType');
};

const toPaymentMethodDescription = (l: Locale, e: Event[]): string => {
    const paymentToolDetails = getPaymentToolDetails(e);
    const description = toDetailsDescription(paymentToolDetails, l);
    switch (paymentToolDetails.detailsType) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return `${l['form.final.success.card.text']} ${description}`;
        case PaymentToolDetailsType.PaymentToolDetailsDigitalWallet:
            return `${l['form.final.success.wallet.text']} ${description}`;
        case PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal:
            return `${l['form.final.success.terminal.text']} ${description}`
    }
    throw new Error('Unsupported PaymentToolDetailsType');
};

export const getSuccessDescription = (l: Locale, e: Event[]): JSX.Element => (
    <p className={styles.text}>
        {toPaymentMethodDescription(l, e)}
        <br/>
        {l['form.final.success.check.text']}.
    </p>
);
