import { resolveBoolean } from './resolve-boolean';
import { resolveInteger } from './resolve-integer';
import { InitConfig } from '../init-config';
import { resolveIntegrationType } from './resolve-integration-type';
import { UserConfig } from './user-config';

export const resolveInitConfig = (userConfig: UserConfig): InitConfig => {
    const integrationType = resolveIntegrationType(userConfig);
    if (!integrationType) {
        throw new Error('Unrecognized integration type');
    }
    const amount = resolveInteger(userConfig.amount, 'amount');
    const obscureCardCvv = resolveBoolean(userConfig.obscureCardCvv, 'obscureCardCvv');
    const requireCardHolder = resolveBoolean(userConfig.requireCardHolder, 'requireCardHolder');
    return {
        ...new InitConfig(),
        ...userConfig,
        integrationType,
        amount,
        obscureCardCvv,
        requireCardHolder
    };
};
