import { Transport, PossibleEvents } from '../../communication';
import { Config, InitConfig } from '.';
import { deserialize } from 'checkout/utils';
import { resolveAmount, resolveIntegrationType } from './param-resolvers';

const resolveInitConfig = (userConfig: any): InitConfig => {
    const integrationType = resolveIntegrationType(userConfig);
    if (!integrationType) {
        throw new Error('Unrecognized integration type');
    }
    const amount = resolveAmount(userConfig.amount);
    return {
        ...new InitConfig(),
        ...userConfig,
        integrationType,
        amount
    };
};

export class ConfigResolver {

    static resolve(transport: Transport): Promise<Config> {
        return this.resolveInitConfig(transport)
            .then((userConfig) => ({
                origin: this.getOrigin(),
                initConfig: resolveInitConfig(userConfig),
                ready: false
            }));
    }

    private static resolveInitConfig(transport: Transport): Promise<InitConfig> {
        return new Promise((resolve) => {
            this.isUriContext()
                ? resolve(deserialize(location.search))
                : transport.on(PossibleEvents.init, (config) => resolve(config));
        });
    }

    private static isUriContext(): boolean {
        return !!location.search;
    }

    private static getOrigin(): string {
        const currentScript: any = document.currentScript || this.getCurrentScript();
        const url = new URL(currentScript.src);
        return url.origin;
    }

    private static getCurrentScript(): HTMLElement {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    }
}
