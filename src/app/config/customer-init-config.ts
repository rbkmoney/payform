import { InitConfig } from './init-config';
import { IntegrationType } from './integration-type';

export class CustomerInitConfig extends InitConfig {
    customerID: string;
    customerAccessToken: string;

    constructor() {
        super();
        this.integrationType = IntegrationType.customer;
    }
}
