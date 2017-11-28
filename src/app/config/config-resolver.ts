import * as URL from 'url-parse';
import { Transport, PossibleEvents } from '../../communication-ts';
import { UriSerializer } from '../../utils/uri-serializer';
import { Config, InitConfig } from '.';
import { IntegrationType } from './integration-type';

export class ConfigResolver {

    static resolve(transport: Transport): Promise<Config> {
        return this.resolveInitConfig(transport)
            .then((initConfig) => ({
                origin: this.getOrigin(),
                initConfig
            }));
    }

    private static resolveInitConfig(transport: Transport): Promise<InitConfig> {
        return new Promise((resolve) => {
            this.isUriContext()
                ? resolve(UriSerializer.deserialize(location.search))
                : transport.on(PossibleEvents.init, (config) => resolve(config));
        }).then((config: InitConfig) => {
            config.integrationType = this.calcIntegrationType();
            return config;
        });
    }

    private static calcIntegrationType(): IntegrationType {
        return IntegrationType.invoice; // TODO implement here
    }

    private static isUriContext(): boolean {
        return !!location.search;
    }

    private static getOrigin(): string {
        const currentScript: any = document.currentScript || this.getCurrentScript();
        const url = URL(currentScript.src);
        return url.origin;
    }

    private static getCurrentScript(): HTMLElement {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    }
}
