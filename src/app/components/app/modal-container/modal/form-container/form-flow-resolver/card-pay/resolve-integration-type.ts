import { toNumber } from 'lodash';
import { CardFormFlowItem } from 'checkout/form-flow';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { FormContainerProps } from '../../form-container-props';
import { Shortened } from '../form-flow-resolver';
import { getAmount } from '../../../amount-resolver';
import { ModelState } from 'checkout/state';

const resolveAmount = (t: IntegrationType, m: ModelState, formAmount: string): number =>
    formAmount ? toNumber(formAmount) * 100 : getAmount(t, m).value;

const createInvoiceWithTemplate = (p: FormContainerProps, i: CardFormFlowItem) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceTemplateInitConfig;
    const amount = resolveAmount(IntegrationType.invoiceTemplate, p.model, i.values.amount);
    const metadata = p.model.invoiceTemplate.metadata;
    const params = {amount, metadata, currency: 'RUB'}; // TODO fix hardcoded currency
    p.createInvoiceWithTemplate(endpoint, c.invoiceTemplateAccessToken, c.invoiceTemplateID, params);
};

const setInvoiceAccessToken = (p: FormContainerProps) => {
    const token = (p.config.initConfig as InvoiceInitConfig).invoiceAccessToken;
    p.setInvoiceAccessToken(token);
};

const resolveInvoiceTemplate = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const done = !!(p.model.invoice && p.model.invoiceAccessToken);
    fn('createInvoice', createInvoiceWithTemplate.bind(null, p, i), done);
};

const resolveInvoice = (fn: Shortened, p: FormContainerProps) => {
    const done = !!p.model.invoiceAccessToken;
    fn('createInvoice', setInvoiceAccessToken.bind(null, p), done);
};

export const resolveIntegrationType = (fn: Shortened, p: FormContainerProps, i: CardFormFlowItem) => {
    const initConfig = p.config.initConfig;
    switch (initConfig.integrationType) {
        case IntegrationType.invoiceTemplate:
            resolveInvoiceTemplate(fn, p, i);
            break;
        case IntegrationType.invoice:
            resolveInvoice(fn, p);
            break;
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};
