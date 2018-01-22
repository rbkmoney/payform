import { HoldExpiration } from './hold-expiration';
import { IntegrationType } from './integration-type';

export class InitConfig {
    integrationType: IntegrationType;
    terminals: boolean;
    wallets: boolean;
    paymentFlowHold: boolean;
    holdExpiration: HoldExpiration;
    locale: string;
    popupMode: boolean;
    redirectUrl?: string;
    name?: string;
    description?: string;
    email?: string;

    constructor() {
        this.terminals = true;
        this.wallets = true;
        this.paymentFlowHold = false;
        this.holdExpiration = HoldExpiration.cancel;
        this.locale = 'auto';
        this.popupMode = false;
    }
}
