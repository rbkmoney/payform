import { Transport, PossibleEvents } from '../../communication';
import { Config, InitConfig } from '.';
import { deserialize } from 'checkout/utils';
import { resolveInteger, resolveIntegrationType, resolveBoolean } from './param-resolvers';
import { ieHack } from '../../utils/ie-hack';

const resolveInitConfig = (userConfig: any): InitConfig => {
    const integrationType = resolveIntegrationType(userConfig);
    if (!integrationType) {
        throw new Error('Unrecognized integration type');
    }
    const amount = resolveInteger(userConfig.amount, 'amount');
    const obscureCardCvv = resolveBoolean(userConfig.obscureCardCvv, 'obscureCardCvv');
    return {
        ...new InitConfig(),
        ...userConfig,
        integrationType,
        amount,
        obscureCardCvv
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
        const currentScript = (document.currentScript || ieHack) as HTMLScriptElement;
        const url = new URL(currentScript.src);
        return url.origin;
    }
}
