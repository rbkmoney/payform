import { AppProps } from './app-props';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { InitializationStage, StepStatus } from 'checkout/state';
import { ChangeStepStatus, StepName } from 'checkout/actions';

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

const manageInvoicePaymentMethods = (p: AppProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceInitConfig;
    p.getInvoicePaymentMethods(endpoint, c.invoiceAccessToken, c.invoiceID);
};

const manageInvoicePaymentMethodsByTemplate = (p: AppProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceTemplateInitConfig;
    p.getInvoicePaymentMethodsByTemplateId(endpoint, c.invoiceTemplateAccessToken, c.invoiceTemplateID);
};

const managePaymentMethods = (p: AppProps) => {
    const config = p.config.initConfig;
    if (!config.integrationType) {
        throw new Error('Unexpected integrationType');
    }
    switch (config.integrationType) {
        case IntegrationType.invoiceTemplate:
            manageInvoicePaymentMethodsByTemplate(p);
            break;
        case IntegrationType.invoice:
            manageInvoicePaymentMethods(p);
            break;
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};

const resolveAsyncStage = (stage: InitializationStage,
                           statusChanger: (name: StepName, status: StepStatus) => ChangeStepStatus,
                           stepName: StepName,
                           action: () => any,
                           doneCondition: boolean,
                           startCondition: boolean = true) => {
    if (startCondition && !stage[stepName]) {
        action();
        statusChanger(stepName, 'started');
    }
    if (stage[stepName] === 'started' && doneCondition) {
        statusChanger(stepName, 'done');
    }
};

type Shortened = (stepName: StepName, action: () => any, doneCondition: boolean, startCondition?: boolean) => void;

const receiveAppConfig = (fn: Shortened, p: AppProps) => {
    const done = !!p.config.appConfig;
    fn('receiveAppConfig', p.getAppConfig, done);
};

const receiveLocale = (fn: Shortened, p: AppProps) => {
    const done = !!p.config.locale;
    fn('receiveLocale', p.getLocaleConfig, done);
};

const receivePaymentSubject = (fn: Shortened, p: AppProps) => {
    const done = !!(p.model.invoice || p.model.invoiceTemplate);
    const start = p.initialization.receiveAppConfig === 'done';
    fn('receivePaymentSubject', manageModel.bind(null, p), done, start);
};

const receivePaymentMethods = (fn: Shortened, p: AppProps) => {
    const done = !!p.model.paymentMethods;
    const start = p.initialization.receiveAppConfig === 'done';
    fn('receivePaymentMethods', managePaymentMethods.bind(null, p), done, start);
};

const resolveDone = (p: AppProps) => {
    const stage = p.initialization;
    const done =
        stage.receiveLocale === 'done' &&
        stage.receivePaymentSubject === 'done' &&
        stage.receivePaymentMethods === 'done';
    if (done) {
        p.changeStageStatus('ready');
    }
};

export const manageInitStage = (p: AppProps) => {
    if (p.error) {
        return;
    }
    const shortened = resolveAsyncStage.bind(null, p.initialization, p.changeStepStatus);
    receiveAppConfig(shortened, p);
    receiveLocale(shortened, p);
    receivePaymentSubject(shortened, p);
    receivePaymentMethods(shortened, p);
    resolveDone(p);
};
