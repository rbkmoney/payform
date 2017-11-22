import * as URL from 'url-parse';
import { Transport, PossibleEvents } from '../../communication-ts';
import { UriSerializer } from '../../utils/uri-serializer';
import { AppConfig, Config, InitConfig } from '.';
import { IntegrationType } from './integration-type';

export class ConfigResolver {

    static resolve(transport: Transport): Promise<Config> {
        return Promise.all([
            this.resolveInitConfig(transport),
            this.loadAppConfig()
        ]).then((configs) => {
            return {
                origin: this.getOrigin(),
                initConfig: configs[0],
                appConfig: configs[1]
            };
        });
    }

    private static loadAppConfig(): Promise<AppConfig> {
        return fetch('../appConfig.json', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then((response) => response.json());
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
