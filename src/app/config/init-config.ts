import { HoldExpiration } from './hold-expiration';
import { IntegrationType } from './integration-type';

export class InitConfig {
    integrationType: IntegrationType;
    terminals: boolean = false;
    paymentFlowHold: boolean = false;
    holdExpiration: HoldExpiration = HoldExpiration.cancel;
    locale: string = 'auto';
    popupMode: boolean = false;
    redirectUrl?: string;
    name?: string;
    description?: string;
    email?: string;
}
