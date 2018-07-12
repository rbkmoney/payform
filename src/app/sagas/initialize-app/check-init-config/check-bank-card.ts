import { InitConfig, IntegrationType } from 'checkout/config';
import { PaymentMethod, PaymentMethodName } from 'checkout/backend';
import { CheckResult, UnavailableReason } from 'checkout/sagas/log-unavailable-result';

const checkForInvoiceAndTemplate = (paymentMethods: PaymentMethod[]): CheckResult => {
    const bankCardOnly = paymentMethods.length === 1 && paymentMethods[0].method === PaymentMethodName.BankCard;
    return bankCardOnly ? {
        available: false,
        reason: UnavailableReason.capability,
        message: 'Bank card is single available payment method.'
    } : {available: true};
};

export const checkBankCard = (initConfig: InitConfig, paymentMethods: PaymentMethod[]): CheckResult => {
    const {bankCard, wallets, terminals, integrationType} = initConfig;
    if (bankCard) {
        return {available: true};
    }
    if (!bankCard && !wallets && !terminals) {
        return {
            available: false,
            reason: UnavailableReason.capability,
            message: 'You can not disable all payment methods.'
        };
    }
    switch (integrationType) {
        case IntegrationType.invoiceTemplate:
        case IntegrationType.invoice:
            return checkForInvoiceAndTemplate(paymentMethods);
        case IntegrationType.customer:
            return {
                available: false,
                reason: UnavailableReason.capability,
                message: 'Param \'bankCard\' is only available for invoice and invoice template integration'
            };
    }
};
