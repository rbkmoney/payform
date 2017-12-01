import { AppProps } from './app';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';

const manageInvoiceTemplate = (p: AppProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceTemplateInitConfig;
    p.getInvoiceTemplate(endpoint, c.invoiceTemplateAccessToken, c.invoiceTemplateID);
};

const manageInvoice = (p: AppProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceInitConfig;
    p.getInvoice(endpoint, c.invoiceAccessToken, c.invoiceID);
};

const manageModel = (p: AppProps) => {
    const config = p.config.initConfig;
    if (!config.integrationType) {
        throw new Error('Unexpected integrationType');
    }
    switch (config.integrationType) {
        case IntegrationType.invoiceTemplate:
            manageInvoiceTemplate(p);
            break;
        case IntegrationType.invoice:
            manageInvoice(p);
            break;
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};

export const manageInitStage = (p: AppProps) => {
    if (p.error) {
        return;
    }
    const initStage = p.initialization;
    if (!initStage.appConfigReceived) {
        p.getAppConfig();
    } else if (!initStage.modelReceived) {
        manageModel(p);
    } else if (!initStage.stageDone) {
        p.setInitStageDone();
    }
};
