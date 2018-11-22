import * as React from 'react';

import { InvoiceEvent, PaymentToolDetailsType } from 'checkout/backend';
import { Locale } from 'checkout/locale';
import { getInvoicePaymentDetails } from './payment-details';
import { logPrefix } from 'checkout/log-messages';
import { Text } from './text';

const getPaymentMethodDescription = (l: Locale, e: InvoiceEvent[]): string => {
    const details = getInvoicePaymentDetails(e);
    switch (details.type) {
        case PaymentToolDetailsType.PaymentToolDetailsBankCard:
            return `${l['form.final.success.card.text']} ${details.info}`;
        case PaymentToolDetailsType.PaymentToolDetailsDigitalWallet:
            return `${l['form.final.success.wallet.text']} ${details.info}`;
        case PaymentToolDetailsType.PaymentToolDetailsPaymentTerminal:
            return `${l['form.final.success.terminal.text']} ${details.info}`;
        default:
            console.warn(`${logPrefix} Unsupported PaymentToolDetailsType`, details);
            return '';
    }
};

export const getSuccessDescription = (l: Locale, e: InvoiceEvent[]): JSX.Element => (
    <Text>
        {getPaymentMethodDescription(l, e)}
        <br />
        {l['form.final.success.check.text']}.
    </Text>
);
