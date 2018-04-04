import { PossibleEvents, Transport } from '../../../communication';
import { Config } from '../config';
import { deserialize } from 'checkout/utils';
import { getOrigin } from '../../../get-origin';
import { UserConfig } from './user-config';
import { resolveInitConfig } from './resolve-init-config';
import { isInFrame } from '../../../is-in-iframe';

const isUriContext = !!location.search;

const resolveUserConfig = (transport: Transport): Promise<UserConfig> =>
    new Promise((resolve) =>
        isUriContext
            ? resolve(deserialize(location.search))
            : transport.on(PossibleEvents.init, (config) => resolve(config)));

export const resolveConfig = (transport: Transport): Promise<Config> =>
    resolveUserConfig(transport).then((userConfig) => ({
        origin: getOrigin(),
        inFrame: isInFrame(),
        initConfig: resolveInitConfig(userConfig)
    }));
