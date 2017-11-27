import { InitConfig } from './init-config';
import { IntegrationType } from './integration-type';

export class InvoiceInitConfig extends InitConfig {
    invoiceID: string;
    invoiceAccessToken: string;

    constructor() {
        super();
        this.integrationType = IntegrationType.invoice;
    }
}
