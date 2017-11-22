import { InitConfig } from './init-config';
import { IntegrationType } from './integration-type';

export class InvoiceTemplateInitConfig extends InitConfig {
    invoiceTemplateID: string;
    invoiceTemplateAccessToken: string;

    constructor() {
        super();
        this.integrationType = IntegrationType.invoiceTemplate;
    }
}
