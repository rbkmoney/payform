import { AppProps } from './app-props';
import { IntegrationType, InvoiceInitConfig, InvoiceTemplateInitConfig } from 'checkout/config';
import { ChangeType, Event, Invoice, InvoiceCreated } from 'checkout/backend';
import { resolveStage, StageStatus, StepStatus } from 'checkout/lifecycle';

const stageName = 'initialization';

type Shortened = (stepName: string, action: () => any, doneCondition: boolean, startCondition?: boolean) => void;

const manageInvoiceTemplate = (p: AppProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceTemplateInitConfig;
    p.getInvoiceTemplate(endpoint, c.invoiceTemplateAccessToken, c.invoiceTemplateID);
};

const manageInvoice = (p: AppProps) => {
    const endpoint = p.config.appConfig.capiEndpoint;
    const c = p.config.initConfig as InvoiceInitConfig;
    p.getInvoiceEvents(endpoint, c.invoiceAccessToken, c.invoiceID);
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

const receiveAppConfig = (fn: Shortened, p: AppProps) => {
    const done = !!p.config.appConfig;
    fn('receiveAppConfig', p.getAppConfig, done);
};

const receiveLocale = (fn: Shortened, p: AppProps) => {
    const done = !!p.config.locale;
    fn('receiveLocale', p.getLocaleConfig, done);
};

const findInvoice = (events: Event[]): Invoice => {
    return events.reduce((result: Invoice, event: Event) => {
        if (!result) {
            const found = event.changes.find((change) => change.changeType === ChangeType.InvoiceCreated);
            return found ? (found as InvoiceCreated).invoice : null;
        }
        return result;
    }, null);
};

const receiveInvoiceSubject = (fn: Shortened, p: AppProps) => {
    const events = p.model.invoiceEvents;
    if (events && !p.model.invoice) {
        p.setInvoice(findInvoice(events));
    }
    const done = !!(events && p.model.invoice);
    const start = p.initialization.receiveAppConfig === StepStatus.done;
    fn('receivePaymentSubject', manageInvoice.bind(null, p), done, start);
};

const receiveInvoiceTemplateSubject = (fn: Shortened, p: AppProps) => {
    const done = !!p.model.invoiceTemplate;
    const start = p.initialization.receiveAppConfig === StepStatus.done;
    fn('receivePaymentSubject', manageInvoiceTemplate.bind(null, p), done, start);
};

const receivePaymentSubject = (fn: Shortened, p: AppProps) => {
    switch (p.config.initConfig.integrationType) {
        case IntegrationType.invoice:
            receiveInvoiceSubject(fn, p);
            break;
        case IntegrationType.invoiceTemplate:
            receiveInvoiceTemplateSubject(fn, p);
            break;
        case IntegrationType.customer:
            throw new Error('Unhandled customer integration');
    }
};

const receivePaymentMethods = (fn: Shortened, p: AppProps) => {
    const done = !!p.model.paymentMethods;
    const start = p.initialization.receiveAppConfig === StepStatus.done;
    fn('receivePaymentMethods', managePaymentMethods.bind(null, p), done, start);
};

const resolveDone = (p: AppProps) => {
    const stage = p.initialization;
    const done =
        stage.receiveLocale === StepStatus.done &&
        stage.receivePaymentSubject === StepStatus.done &&
        stage.receivePaymentMethods === StepStatus.done;
    if (done) {
        p.changeStageStatus(stageName, StageStatus.ready);
    }
};

export const manageInitStage = (p: AppProps) => {
    if (p.error) {
        return;
    }
    const shortened = resolveStage.bind(null, p.initialization, p.changeStepStatus, stageName);
    receiveAppConfig(shortened, p);
    receiveLocale(shortened, p);
    receivePaymentSubject(shortened, p);
    receivePaymentMethods(shortened, p);
    resolveDone(p);
};
