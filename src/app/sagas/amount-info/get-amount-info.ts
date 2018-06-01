import { InitConfig, IntegrationType } from 'checkout/config';
import { resolveInvoiceTemplate } from './resolve-invoice-template';
import { resolveInvoice } from './resolve-invoice';
import { AmountInfoState, ModelState } from 'checkout/state';

export const getAmountInfo = (initConfig: InitConfig, model: ModelState): AmountInfoState => {
    switch (initConfig.integrationType) {
        case IntegrationType.invoice:
            return resolveInvoice(model.invoice);
        case IntegrationType.invoiceTemplate:
            return resolveInvoiceTemplate(model.invoiceTemplate, initConfig.amount);
        case IntegrationType.customer:
            return null;
    }
};
