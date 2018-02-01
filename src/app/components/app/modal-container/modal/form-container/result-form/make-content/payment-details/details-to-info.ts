import {
    DigitalWalletDetailsQiwi, DigitalWalletDetailsType, PaymentToolDetailsDigitalWallet,
    PaymentToolDetailsPaymentTerminal
} from 'checkout/backend/model';
import { PaymentToolDetailsBankCard } from 'checkout/backend';

export const toCardInfo = (details: PaymentToolDetailsBankCard): string => `${details.paymentSystem} *${details.cardNumberMask}`;

const toDigitalWalletQiwiInfo = (details: DigitalWalletDetailsQiwi): string => `qiwi ${details.phoneNumberMask}`;

export const toDigitalWalletInfo = (details: PaymentToolDetailsDigitalWallet): string => {
    switch (details.digitalWalletDetailsType) {
        case DigitalWalletDetailsType.DigitalWalletDetailsQIWI:
            return toDigitalWalletQiwiInfo(details as any); // mixin cast problem
    }
    throw new Error('Unsupported DigitalWalletDetailsType');
};

export const toTerminalInfo = (details: PaymentToolDetailsPaymentTerminal): string => details.provider;
